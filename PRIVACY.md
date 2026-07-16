# Privacy and data flow

Chatobby Runtime executes locally and does not currently use a Chatobby account,
hosted Chatobby storage, product analytics, or automatic crash reporting.

When you use a remote model, Chatobby sends that provider the prompt and context
needed for the request. Depending on your instructions and permissions, this
may include message history, note content, attachments, memory and task context,
tool arguments and results, command output, and file contents. Websites, MCP
servers, and other integrations may contact their own third parties.

Chatobby stores runtime files, sessions, memory, credentials, events, tasks,
and other state locally in documented user or project locations. Local data
remains until you or a product feature deletes it. Uninstalling the connector or
runtime intentionally preserves user-owned data.

Madelyn Cruz Tan receives no vault or session content automatically. GitHub
receives normal request information when you view this repository or download a
release. Patreon receives normal request and account information only if you
choose to visit the optional support page.

The complete versioned `PRIVACY-AND-DATA-FLOW-NOTICE.txt` is displayed by the
installer and attached to every release. Questions can be sent to
`madelyntan0223@gmail.com`. Do not send provider keys, private notes, or
unredacted diagnostics.
