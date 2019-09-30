import {
    trigger,
    animateChild,
    group,
    style,
    animate,
    transition,
    query
  } from '@angular/animations';

export const slideInAnimation =
  trigger('routeAnimations', [  //pull left
    transition('HomePage => *, * => ContactPage, CareerPage => HobbiesPage', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]), //Next thing
      query(':enter', [
        style({ left: '100%'})
      ]),
      query(':leave', [
        style({ right: '100%'})
      ]),
      group([  //This thing
        query(':leave', [
          animate('400ms ease-out', style({ left: '-100%'}))
        ]),
        query(':enter', [
          animate('400ms ease-out', style({ left: '0%'}))
        ])
      ]),
      query(':enter', animateChild()),
    ]),
    transition('ContactPage => *, * => HomePage, HobbiesPage => CareerPage', [    //pull right
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]), //Next thing
      query(':enter', [
        style({ left: '-100%'})
      ]),
      query(':leave', [
        style({ right: '100%'})
      ]),
      group([  //This thing
        query(':leave', [
          animate('400ms ease-out', style({ left: '100%'}))
        ]),
        query(':enter', [
          animate('400ms ease-out', style({ left: '0%'}))
        ])
      ]),
      query(':enter', animateChild()),
    ]),
  ]);