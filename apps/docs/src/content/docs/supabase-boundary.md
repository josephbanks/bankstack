---
title: Supabase Boundary
description: Bankstack keeps Supabase credentials, auth checks, and RLS policy work explicit instead of provisioning them for you.
order: 6
---

The alpha scaffold includes Supabase placeholders so app code has a clear boundary for identity and data access. It does not create a Supabase project, product tables, auth UI, migrations for your domain, or row level security policies for real data.

## Current Key Terminology

New docs should use Supabase's current publishable and secret key terminology:

- Publishable keys are suitable for browser-visible configuration when paired with your public Supabase URL.
- Secret keys are backend-only and must not be exposed to browser code.
- Legacy `anon` and `service_role` keys may appear in older material, but new Bankstack docs should not present them as the primary terms.

The generated templates use `PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_PUBLISHABLE_KEY` for browser-safe configuration, plus server-side placeholders where API verification belongs.

## Auth And RLS Boundary

Protected data should be checked at the server or edge boundary before returning it to the client. Row level security should be enabled on exposed tables, with policies written before real product data is reachable through the API.

The starter code intentionally keeps this small: environment contracts, a client helper, and boundary notes. Your app owns product schema, migrations, policies, and UI flows.

Canonical source material: generated [`packages/supabase`](https://github.com/josephbanks/bankstack/tree/main/packages/create-bankstack/templates/workspace/packages/supabase) templates and Supabase API key, server-side auth, and RLS guidance.
