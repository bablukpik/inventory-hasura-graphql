import { RuleObject } from "antd/es/form";
import { StoreValue } from "antd/es/form/interface";

export const validateNonZero = (_rule: RuleObject, value: StoreValue) => {
  if (value === "0" || Number(value) < 0) {
    return Promise.reject("Value cannot be zero or negative");
  }
  return Promise.resolve();
};
