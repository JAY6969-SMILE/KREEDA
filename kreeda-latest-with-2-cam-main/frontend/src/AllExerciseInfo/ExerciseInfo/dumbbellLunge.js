import DumbbellLunges from '../audios/DumbbellLunges.mp3';
import {calculateangle} from '../../GlobalFunctions/calculateAngle';

const dumbbellLunges = [
  'Dumbbell Lunge',
  'The lunge is an exercise that not only strengthens your leg muscles, but it can also be used to train your balance, coordination and control.',
  true,
  'https://hips.hearstapps.com/hmg-prod/images/workouts/2016/03/dumbbelllunge-1457044372.gif?resize=1200:*',
  DumbbellLunges,
  0.0030, // arms_met_ratio
  5.1, // calories per minute for a 70 kg person
  "sideCamera",
];

// Evaluation phase 1 for Dumbbell One-Arm Shoulder Press
export function evaluate1 (att) {
  return calculateangle (att[24], att[26], att[28]) > 170;
}

// Evaluation phase 2 for Dumbbell One-Arm Shoulder Press
export function evaluate2 (att) {
  return calculateangle (att[24], att[26], att[28]) < 98;
}

export function evaluate1ForSideCam(att) {
  // Check if the body is in the correct position for Push-ups
  if (
    Math.abs(att[25].y - att[27].y) >50
  ) return true; // Not in the correct position yet
}

// Evaluation phase 2 for Pushups
export function evaluate2ForSideCam(att) {
  if (
    Math.abs(att[25].y - att[27].y) > 30
  ) return true; // Not in the correct position yet
}


export default dumbbellLunges;
