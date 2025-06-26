"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pickRandomPersona = void 0;
const pickRandomPersona = () => {
    const personas = ["enthusiastic", "skeptical", "professional"];
    const index = Math.floor(Math.random() * personas.length);
    return personas[index];
};
exports.pickRandomPersona = pickRandomPersona;
