# Fullstack Authentication Example with Next.js and NextAuth.js

Создать базу данных

```shell
pscale db create blog-next-prisma --region <REGION>
```

Создать ветку для базы данных

```shell
pscale branch create blog-next-prisma <name_branch>
```

Присоединится к базе данных

```shell
pscale connect blog-next-prisma <name_branch> --port 3309
```

Shell MySQL

```shell
pscale shell blog-next-prisma <name_branch>
```
