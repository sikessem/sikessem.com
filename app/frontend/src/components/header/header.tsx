import { component$ } from "@builder.io/qwik";
import {
  SiGithub as GithubIcon,
  SiTwitter as TwitterIcon,
} from "@qwikest/icons/simpleicons";
import { SikessemLogo } from "~/components/icons/sikessem";
import styles from "./header.module.css";

export default component$(() => {
  return (
    <header class={styles.header}>
      <div class={["container", styles.wrapper]}>
        <div class={styles.logo}>
          <a href="/" title="qwik">
            <SikessemLogo height={60} width={200} />
          </a>
        </div>
        <ul>
          <li>
            <a
              href="https://github.com/sikessem/"
              target="_blank"
              rel="noreferrer"
              aria-label="Sikessem Github"
            >
              <GithubIcon class="w-8 h-8" />
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/sikessem_tweets/"
              target="_blank"
              rel="noreferrer"
              aria-label="Sikessem Twitter"
            >
              <TwitterIcon class="w-8 h-8" />
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
});
