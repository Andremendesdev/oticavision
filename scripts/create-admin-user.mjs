/**
 * Cria o usuário admin no Supabase Auth.
 *
 * Configure no .env.local:
 *   ADMIN_EMAIL=seu@email.com
 *   ADMIN_PASSWORD=senha-segura
 *   SUPABASE_SERVICE_ROLE_KEY=sb_secret_... (Dashboard → Settings → API Keys → Secret)
 *
 * Uso: pnpm create-admin
 */

import { readFileSync, existsSync } from "node:fs"
import { resolve } from "node:path"

function loadEnvFile(path) {
  if (!existsSync(path)) return
  const content = readFileSync(path, "utf8")
  for (const line of content.split("\n")) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith("#")) continue
    const eq = trimmed.indexOf("=")
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    const value = trimmed.slice(eq + 1).trim()
    if (!process.env[key]) process.env[key] = value
  }
}

loadEnvFile(resolve(process.cwd(), ".env.local"))
loadEnvFile(resolve(process.cwd(), ".env"))

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ??
  process.env.SUPABASE_SECRET_KEY
const email = process.env.ADMIN_EMAIL
const password = process.env.ADMIN_PASSWORD

function missing(vars) {
  console.error("\n❌ Variáveis faltando no .env.local:\n")
  for (const v of vars) console.error(`   ${v}`)
  console.error(`
Obtenha a Secret key em:
  Supabase Dashboard → Settings → API Keys

Exemplo .env.local:

  NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
  NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
  ADMIN_EMAIL=seu@email.com
  ADMIN_PASSWORD=SuaSenhaSegura123
  SUPABASE_SERVICE_ROLE_KEY=sb_secret_...
`)
  process.exit(1)
}

const missingVars = []
if (!url) missingVars.push("NEXT_PUBLIC_SUPABASE_URL")
if (!serviceKey) missingVars.push("SUPABASE_SERVICE_ROLE_KEY")
if (!email) missingVars.push("ADMIN_EMAIL")
if (!password) missingVars.push("ADMIN_PASSWORD")
if (missingVars.length) missing(missingVars)

console.log(`\n🔐 Criando admin: ${email}\n`)

const response = await fetch(`${url}/auth/v1/admin/users`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${serviceKey}`,
    apikey: serviceKey,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    email,
    password,
    email_confirm: true,
  }),
})

const body = await response.json()

if (!response.ok) {
  if (body.msg?.includes("already been registered") || body.message?.includes("already")) {
    console.log("ℹ️  Usuário já existe com este e-mail.")
    console.log("   Se esqueceu a senha, redefina no Dashboard → Authentication → Users\n")
    process.exit(0)
  }
  console.error("❌ Erro:", body.msg ?? body.message ?? JSON.stringify(body))
  process.exit(1)
}

console.log("✅ Usuário admin criado com sucesso!")
console.log(`   E-mail: ${email}`)
console.log(`   ID:     ${body.id}`)
console.log(`
Próximos passos:
  1. Confirme ADMIN_EMAIL=${email} no .env.local
  2. Reinicie: pnpm dev
  3. Acesse: http://localhost:3000/login
`)
