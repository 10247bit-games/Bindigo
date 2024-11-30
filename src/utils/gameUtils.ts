import type { Cell, Player, BotPlayer } from '../types/game';

export const generateRandomBoard = (): Cell[][] => {
  const numbers = Array.from({ length: 25 }, (_, i) => i + 1)
    .sort(() => Math.random() - 0.5);
  
  return Array.from({ length: 5 }, (_, i) =>
    numbers.slice(i * 5, (i + 1) * 5).map(value => ({ 
      value, 
      marked: false 
    }))
  );
};

export const checkBingoLines = (board: Cell[][], existingLines: string[]): string[] => {
  const newLines: string[] = [];

  // Check rows
  board.forEach((row, i) => {
    const lineId = `row-${i}`;
    if (!existingLines.includes(lineId) && row.every(cell => cell.marked)) {
      newLines.push(lineId);
    }
  });

  // Check columns
  for (let col = 0; col < 5; col++) {
    const lineId = `col-${col}`;
    if (!existingLines.includes(lineId) && board.every(row => row[col].marked)) {
      newLines.push(lineId);
    }
  }

  // Check diagonals
  if (!existingLines.includes('diag-1') && board.every((row, i) => row[i].marked)) {
    newLines.push('diag-1');
  }
  if (!existingLines.includes('diag-2') && board.every((row, i) => row[4 - i].marked)) {
    newLines.push('diag-2');
  }

  return newLines;
};

export const makeBotMove = (player: Player, difficulty: BotPlayer['difficulty']): number => {
  const board = player.board;
  const unselectedCells = board.flat().filter(cell => !cell.marked);
  
  if (unselectedCells.length === 0) return 0;

  // Different strategies based on difficulty
  switch (difficulty) {
    case 'hard':
      // Look for potential winning moves
      const potentialWinningMoves = findPotentialWinningMoves(board);
      if (potentialWinningMoves.length > 0) {
        return potentialWinningMoves[Math.floor(Math.random() * potentialWinningMoves.length)];
      }
      // fallthrough

    case 'medium':
      // Prioritize moves that could complete lines
      const strategicMoves = findStrategicMoves(board);
      if (strategicMoves.length > 0 && Math.random() > 0.3) {
        return strategicMoves[Math.floor(Math.random() * strategicMoves.length)];
      }
      // fallthrough

    case 'easy':
    default:
      // Random move
      return unselectedCells[Math.floor(Math.random() * unselectedCells.length)].value;
  }
};

const findPotentialWinningMoves = (board: Cell[][]): number[] => {
  const moves: number[] = [];

  // Check rows
  board.forEach(row => {
    const markedCount = row.filter(cell => cell.marked).length;
    if (markedCount === 4) {
      const unmarkedCell = row.find(cell => !cell.marked);
      if (unmarkedCell) moves.push(unmarkedCell.value);
    }
  });

  // Check columns
  for (let col = 0; col < 5; col++) {
    const column = board.map(row => row[col]);
    const markedCount = column.filter(cell => cell.marked).length;
    if (markedCount === 4) {
      const unmarkedCell = column.find(cell => !cell.marked);
      if (unmarkedCell) moves.push(unmarkedCell.value);
    }
  }

  return moves;
};

const findStrategicMoves = (board: Cell[][]): number[] => {
  const moves: number[] = [];

  // Look for cells that could complete multiple lines
  board.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (!cell.marked) {
        let potentialLines = 0;

        // Check row
        if (row.filter(c => c.marked).length >= 3) potentialLines++;

        // Check column
        if (board.filter(r => r[colIndex].marked).length >= 3) potentialLines++;

        // Check diagonals
        if (rowIndex === colIndex) {
          const diagonal = board.map((r, i) => r[i]);
          if (diagonal.filter(c => c.marked).length >= 3) potentialLines++;
        }
        if (rowIndex + colIndex === 4) {
          const diagonal = board.map((r, i) => r[4 - i]);
          if (diagonal.filter(c => c.marked).length >= 3) potentialLines++;
        }

        if (potentialLines > 0) moves.push(cell.value);
      }
    });
  });

  return moves;
};

export const SOUND_URLS = {
  mark: '/src/assets/sounds/select.wav',
  line: '/src/assets/sounds/line.wav',
  victory: '/src/assets/sounds/victory.mp3'
};