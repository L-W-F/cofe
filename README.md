![](https://repository-images.githubusercontent.com/395399649/270dbea5-ef16-4108-9489-0ffd48be1ff2)

![CI](https://github.com/crossjs/cofe/actions/workflows/ci.yml/badge.svg)
![CodeQL](https://github.com/crossjs/cofe/actions/workflows/codeql-analysis.yml/badge.svg)
![Vercel](https://img.shields.io/github/deployments/crossjs/cofe/production?label=vercel&logo=vercel)

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
