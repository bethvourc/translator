// Replace 'YOUR_GOOGLE_TRANSLATE_API_KEY' with your actual Google Translate API key
const apiKey = 'YOUR_GOOGLE_TRANSLATE_API_KEY';

async function translate() {
    const sourceText = document.getElementById('sourceText').value;
    const targetLanguage = document.getElementById('targetLanguage').value;

    if (!sourceText) {
        alert('Please enter text to translate.');
        return;
    }

    try {
        const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                q: sourceText,
                source: 'en', // Source language (English)
                target: targetLanguage,
            }),
        });

        const data = await response.json();
        
        if (data.data && data.data.translations && data.data.translations.length > 0) {
            const translatedText = data.data.translations[0].translatedText;
            document.getElementById('translatedText').value = translatedText;
        } else {
            alert('Translation failed.');
        }
    } catch (error) {
        console.error('Error during translation:', error);
        alert('An error occurred during translation.');
    }
}
