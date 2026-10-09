<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture
- Keep service copy, capabilities, scope, FAQs, plan definitions, outcomes, scenarios, and business priorities in a typed browser-safe data module; shared enhancement renderers consume this content so a future CMS can replace it without rewriting presentation.
- Use a shared service-detail renderer with explicit leaf routes and per-page metadata; the services parent renders Outlet and the root redirects to the services overview.
- Consultation actions prepare an email to the documented company sales address; never claim an inquiry is stored or sent without a connected delivery service.
