import { defineField, defineType } from "sanity";

export default defineType({
  name: "canalhaPhoto",
  title: "Fotos do Clube dos Canalhas",
  type: "document",
  fields: [
    defineField({
      name: "image",
      title: "Imagem",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Texto Alternativo (Acessibilidade)",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Ordem",
      type: "number",
      description: "Ordem da foto na galeria. Menor número aparece primeiro.",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Manual Order",
      name: "manualOrder",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
