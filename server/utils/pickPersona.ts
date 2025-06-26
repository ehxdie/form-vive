export const pickRandomPersona = () => {
    const personas = ["enthusiastic", "skeptical", "professional"];
    const index = Math.floor(Math.random() * personas.length);
    return personas[index];
}

