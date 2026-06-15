import { defineField, defineType } from "sanity";

export default defineType({
  name: "galleryPhoto",
  title: "Fotos da Galeria Principal",
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
      name: "span",
      title: "Tamanho na Grade (Opcional)",
      type: "string",
      description: "Ex: 'md:col-span-2 md:row-span-2' para ficar maior, ou deixe em branco para o tamanho normal.",
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
