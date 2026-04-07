import type { TaskKey } from '@/lib/site-config'

/**
 * Tasks shown in navigation, footer, home feeds, hero links, create menu, and command palette.
 * Does not change `site.tasks` or API behavior — other tasks remain available via direct URLs.
 */
export const UI_VISIBLE_TASK_KEYS = ['listing'] as const satisfies readonly TaskKey[]

export function isTaskVisibleInUi(key: TaskKey | string): boolean {
  return (UI_VISIBLE_TASK_KEYS as readonly string[]).includes(key)
}
