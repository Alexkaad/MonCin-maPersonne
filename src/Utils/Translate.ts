import {translate} from "@vitalets/google-translate-api";

const cache = new Map<string, string>();

export async function traduireTexte(text: string):Promise<string> {
    try {
        if (cache.has(text)) {
            return cache.get(text)!;
        }
        const result = await translate(text, { to: "fr" });
        console.log(result.text); // Affiche : "Bonjour le monde"
        return result.text;
    } catch (err) {
        console.error("Erreur de traduction :", err);
        return text;
    }
}