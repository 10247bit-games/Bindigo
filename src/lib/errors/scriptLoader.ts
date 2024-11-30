export class ScriptLoader {
  private loadedScripts: Set<string> = new Set();

  loadScript(src: string): Promise<void> {
    if (this.loadedScripts.has(src)) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;

      script.onload = () => {
        this.loadedScripts.add(src);
        resolve();
      };

      script.onerror = (error) => {
        reject(new Error(`Failed to load script: ${src}`));
      };

      document.head.appendChild(script);
    });
  }

  preloadScript(src: string): void {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'script';
    link.href = src;
    document.head.appendChild(link);
  }

  isScriptLoaded(src: string): boolean {
    return this.loadedScripts.has(src);
  }
}

export const scriptLoader = new ScriptLoader();