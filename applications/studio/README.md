# Cofe Studio

## 开始开发

### 配置环境变量

本应用依赖 [supabase](https://supabase.io)

```ini
; .env.development.local 或 .env.production.local
NEXT_PUBLIC_SUPABASE_URL=https://?.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=?
SUPABASE_SECRET_KEY=?
SUPABASE_JWT_SECRET=?
```

### 启动应用

```bash
yarn dev
```

### 发布应用

本应用通过 [vercel](https://vercel.com) 发布
