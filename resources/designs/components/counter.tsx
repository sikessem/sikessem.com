import { $, Slot, useSignal } from '@builder.io/qwik';
import './counter.css';
import { Renderer } from '~/intense';

export class Counter implements Renderer {
    constructor(public name = 'counter') {}

    render ({ init = 0, step = 1 }) {
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