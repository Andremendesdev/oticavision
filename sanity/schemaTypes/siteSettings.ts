import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Configurações do Site",
  type: "document",
  fields: [
    defineField({
      name: "statusOverride",
      title: "Status de Funcionamento (Aberto/Fechado)",
      type: "string",
      options: {
        list: [
          { title: "Automático (por horário)", value: "auto" },
          { title: "Forçar Aberto", value: "open" },
          { title: "Forçar Fechado", value: "closed" },
        ],
        layout: "radio",
      },
      initialValue: "auto",
      description: "Define se o status da barbearia será calculado pelo horário ou forçado manualmente.",
    }),
  ],
});
