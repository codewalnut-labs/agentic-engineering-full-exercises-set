# Portability Matrix

| Agent surface | Project skill path to consider | Notes |
|---|---|---|
| Codex | `.agents/skills/` | Use `$skill-name` explicit invocation when needed. |
| Claude Code | `.claude/skills/` | Keep metadata concise for startup loading. |
| Cursor | `.cursor/skills/` | Avoid shell assumptions unless documented. |
| Gemini CLI | `.gemini/skills/` | Keep references relative to the skill folder. |
