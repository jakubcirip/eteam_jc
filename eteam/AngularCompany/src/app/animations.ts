import {
  trigger,
  transition,
  style,
  query,
  animateChild,
  group,
  animate,
} from '@angular/animations';

const a = [
  style({ position: 'relative' }),
  query(
    ':enter, :leave',
    [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
      }),
    ],
    { optional: true },
  ),
  query(':enter', [style({ top: '-100vh' })], { optional: true }),
  query(':leave', animateChild(), { optional: true }),
  group([
    query(':leave', [animate('500ms ease-in-out', style({ top: '100vh' }))], {
      optional: true,
    }),
    query(':enter', [animate('500ms ease-in-out', style({ top: '0vh' }))], {
      optional: true,
    }),
  ]),
  query(':enter', animateChild(), { optional: true }),
];

const b = [
  style({ position: 'relative' }),
  query(
    ':enter, :leave',
    [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
      }),
    ],
    { optional: true },
  ),
  query(':enter', [style({ left: '-100%' })], { optional: true }),
  query(':leave', animateChild(), { optional: true }),
  group([
    query(':leave', [animate('400ms ease-in-out', style({ left: '100%' }))], {
      optional: true,
    }),
    query(':enter', [animate('500ms ease-in-out', style({ left: '0%' }))], {
      optional: true,
    }),
  ]),
  query(':enter', animateChild(), { optional: true }),
];

export const slideInAnimation = trigger('routeAnimations', [
  transition('* => *', b),
]);

export const fadeInAnimation = trigger('routeAnimations', [
  transition('* => *', a),
]);
