import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("routes/TeacherList.tsx"), route("teacher/:teacher", "routes/TeacherSchdule.tsx")] satisfies RouteConfig;