import { defineField, defineType } from "sanity";

export default defineType({
  name: "service",
  title: "Serviços",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Nome do Serviço",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descrição",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "price",
      title: "Preço",
      type: "string",
      validation: (rule) => rule.required(),
      description: "Ex: R$ 40",
    }),
    defineField({
      name: "whatsappMsg",
      title: "Mensagem do WhatsApp",
      type: "text",
      validation: (rule) => rule.required(),
      description: "Mensagem pré-preenchida ao clicar para agendar.",
    }),
    defineField({
      name: "iconName",
      title: "Ícone",
      type: "string",
      options: {
        list: [
          { title: "Tesoura", value: "scissors" },
          { title: "Navalha / Barba", value: "beard" },
        ],
        layout: "radio",
      },
      initialValue: "scissors",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Ordem",
      type: "number",
      description: "Usado para ordenar os serviços na página. Menor número aparece primeiro.",
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
