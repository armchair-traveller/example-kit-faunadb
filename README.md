# FaunaDB with Magic Authentication (featuring Svelte Kit)

This serves as an example to adapt and build your own FaunaDB-powered app with Magic passwordless login!

👉 See the [live demo]()

## Configuration

Login to the [Magic Dashboard](https://dashboard.magic.link/) to get API keys for your application.

![Magic Dashboard](https://gblobscdn.gitbook.com/assets%2F-M1XNjqusnKyXZc7t7qQ%2F-M3HsSftOAghkNs-ttU3%2F-M3HsllfdwdDmeFXBK3U%2Fdashboard-pk.png?alt=media&token=4d6e7543-ae20-4355-951c-c6421b8f1b5f)

Next, you'll create a FaunaDB database for your application [here](https://dashboard.fauna.com/db-new/). Once you've configured your database, you'll need to prepare it for the schema expected by this example code. Execute the step-by-step queries found in [`init.fql`](./init.fql) from either [FaunaDB's CLI](https://github.com/fauna/fauna-shell) or FaunaDB's Dashboard shell interface. Finally, you'll need to acquire an admin access key for your database (located in the `"Security"` page of FaunaDB's Dashboard sidebar).

Next, copy the `.env.local.example` file in this directory to `.env.local` (this file is intentionally ignored by Git):

```bash
cp .env.local.example .env.local
```

Then, set each variable in `.env.local`:

- `NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY` should look like `pk_test_abc` or `pk_live_ABC`
- `MAGIC_SECRET_KEY` should look like `sk_test_ABC` or `sk_live_ABC`
- `FAUNADB_SECRET_KEY` should look like `fnRB4Ld...`
- `ENCRYPTION_SECRET` is a secret value you choose with at least 32 characters

To complete your deployment on Netlify, you'll need to configure some environment variables with the [Environment Variables UI](https://Netlify.com/blog/environment-variables-ui) or using the [Netlify CLI](https://Netlify.com/download) ([Documentation](https://Netlify.com/docs/cli#commands/env)).

Install [Netlify CLI](https://Netlify.com/download); log in to your account from the CLI; link your project; then run the following command to add the `NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY`, `MAGIC_SECRET_KEY`, `FAUNADB_SECRET_KEY`, and `ENCRYPTION_SECRET` environment variables.

```bash
ntl env add
```
