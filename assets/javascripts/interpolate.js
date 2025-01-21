async function interpolate(lang) {
    try {
      // Fetch the corresponding language file
      const response = await fetch(`template/${lang}.json`);
      const translations = await response.json();
  
      // Get all elements with a data-i18n attribute
      document.querySelectorAll("[data-i18n]").forEach((element) => {
        const key = element.getAttribute("data-i18n");
        const textTemplate = translations[key];
  
        if (textTemplate) {
          // Handle placeholders
          const placeholders = element.getAttribute("data-i18n-placeholder");
          if (placeholders) {
            const params = JSON.parse(placeholders);
            element.textContent = textTemplate.replace(/{(\w+)}/g, (_, p) => params[p] || "");
          } else {
            element.textContent = textTemplate;
          }
        }
      });
    } catch (error) {
      console.error("Failed to load language file:", error);
    }
  }
  
  // Call the function with the desired language code (e.g., "EN" or "DE")
  interpolate("DE");
  