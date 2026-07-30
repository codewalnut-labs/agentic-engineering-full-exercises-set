# Task Board

| Lane | Improvement | Status | Stop condition |
|---|---|---|---|
| Filter reset | Add an explicit reset action, disabled when filters are clear | In progress | Do not edit filter utilities or `App.tsx` |
| Due label | Render singular/plural due labels consistently | In progress | Do not edit types or shared data |
| Activity empty state | Add a useful empty state and semantic time elements | In progress | Do not edit activity data or styles |
| Integration | Wire the existing workflow dashboard and cherry-pick lanes | Owned | Run the complete gate once after integration |

Merge order is filter, detail, activity. Since ownership is disjoint, the
order is a reproducibility choice rather than a hidden dependency.
