import{
    trigger,
    state,
    style,
    animate,
    transition,
    // ...
  
} from '@angular/animations'


export let fadeIn = trigger('fadeIn', [
    transition('void => *', [
      style({ opacity: 0}),
      animate(2000)
    ])
]);


export let expandUp = trigger('expandUp', [
    transition('void => *', [
      style({ height: '15px'}),
      animate(2000)
    ])
]);


export let expandWidth = trigger('expandWidth', [
    transition('void => *', [
      style({ width: '0px'}),
      animate(2000)
    ])
]);