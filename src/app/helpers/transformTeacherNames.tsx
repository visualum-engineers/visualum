import { ClassSchema } from "../../types/ClassSchema";
export const transformTeacherNames = (teachers: ClassSchema["teachers"]) => {
  const parseNamesToPrefix = teachers.map((t) => {
    if (t.prefix) return t.prefix + ". " + t.last_name;
    else return t.first_name + " " + t.last_name;
  });
  const mergeNames = parseNamesToPrefix.reduce(
    (name1, name2) => name1 + ", " + name2,
    ""
  );
  return mergeNames.substring(2, mergeNames.length);
};
