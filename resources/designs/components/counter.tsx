import { $, Slot, useSignal } from '@builder.io/qwik';
import './counter.css';
import { Element } from '~/intense';

export class Counter implements Element {
    constructor(public name = 'counter') {}

    template ({ init = 0, step = 1 }) {
        const count = useSignal(init);
    
        const increment$ = $(() => {
            count.value += step;
        });
    
        return (
            <>
                <div class="relative">
                    <button
                        class="button"
                        type="button"
                        onClick$={() => increment$()}
                    >
                        count is {count.value}
                    </button>
                    <Slot />
                </div>
            </>
        );    
    }
}