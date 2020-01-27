import { getAvg } from './averageService';
import logoImg from './content/estrella.jpg';

$('body').css('background-color', 'lightSkyBlue');


const img =  document.createElement('img');
img.src = logoImg;

document.getElementById('imgContainer').appendChild(img);