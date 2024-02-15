import { type Alpine } from "alpinejs";
import { type AxiosStatic } from "axios";

global
{
  interface Window {
    Alpine: Alpine;
    axios: AxiosStatic;
  }
}
