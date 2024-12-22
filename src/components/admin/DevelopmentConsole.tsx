// Add to DevelopmentConsole component
useEffect(() => {
  const saveInterval = setInterval(async () => {
    if (code) {
      await persistence.saveCodeSnapshot({
        code,
        language,
        timestamp: Date.now()
      });
    }
  }, 30000); // Auto-save every 30 seconds

  return () => clearInterval(saveInterval);
}, [code, language]);

// Add state restoration
useEffect(() => {
  const restoreState = async () => {
    const lastState = await persistence.getCurrentState();
    if (lastState) {
      setCode(lastState.code);
      setLanguage(lastState.language);
    }
  };
  restoreState();
}, []);