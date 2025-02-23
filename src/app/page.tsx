"use client"
import { Button } from "@/components/ui/button"
import Toggler from "@/components/ui/toggler"
import Signin from "@/components/signinoutbtn"
import Signupform from "@/components/Signupform"
import { useEffect } from "react"
import gsap from 'gsap'
import Drawer from '@/components/Drawer'
export default function Home() {
  useEffect(() => {
    gsap.fromTo(
      ".text",
      { opacity: 0, scale: 0.8, fill: "transparent" },
      { opacity: 1, scale: 1.2, fill: "#d4a373", duration: 0.8, ease: "back.out(1.7)", stagger: 0.4,delay:4 }
    );
    gsap.fromTo(
      ".btn",
      {opacity:0},
      {opacity:1,delay:'5'}
    )
  }, []); // Runs once when the component mounts
    
  return (
    <div style={{height:'100vh',width:'100vw',backgroundColor:'#1b263b',justifyItems:'center',alignContent:'center'}}>
        <svg width="584" height="74" viewBox="0 0 584 74" fill="none" xmlns="http://www.w3.org/2000/svg">
<path style={{fill:'transparent',stroke:'white',strokeDasharray:'400',strokeDashoffset:'400',animation:'textAnimation 4s ease-in-out 1 forwards '}} d="M0.296 4.8H14.312V72H0.296V4.8ZM23.144 72H9.128V59.52H22.664C25.608 59.52 28.392 59.136 31.016 58.368C33.64 57.536 35.944 56.256 37.928 54.528C39.912 52.8 41.448 50.624 42.536 48C43.688 45.312 44.264 42.112 44.264 38.4C44.264 34.688 43.688 31.52 42.536 28.896C41.448 26.208 39.912 24 37.928 22.272C35.944 20.544 33.64 19.296 31.016 18.528C28.392 17.696 25.608 17.28 22.664 17.28H9.128V4.8H23.144C30.184 4.8 36.328 6.176 41.576 8.928C46.888 11.68 51.016 15.584 53.96 20.64C56.904 25.632 58.376 31.552 58.376 38.4C58.376 45.248 56.904 51.2 53.96 56.256C51.016 61.248 46.888 65.12 41.576 67.872C36.328 70.624 30.184 72 23.144 72ZM77.8468 72V60.384H111.735V72H77.8468ZM77.8468 16.416V4.8H111.735V16.416H77.8468ZM77.8468 42.048V30.624H109.815V42.048H77.8468ZM69.0148 4.8H82.2628V72H69.0148V4.8ZM134.097 72V60.384H167.985V72H134.097ZM134.097 16.416V4.8H167.985V16.416H134.097ZM134.097 42.048V30.624H166.065V42.048H134.097ZM125.265 4.8H138.513V72H125.265V4.8ZM181.515 4.8H195.243V72H181.515V4.8ZM189.867 16.416V4.8H203.211C208.523 4.8 213.035 5.664 216.747 7.392C220.523 9.12 223.403 11.584 225.387 14.784C227.371 17.984 228.363 21.792 228.363 26.208C228.363 30.56 227.371 34.368 225.387 37.632C223.403 40.832 220.523 43.296 216.747 45.024C213.035 46.752 208.523 47.616 203.211 47.616H189.867V36H203.211C206.859 36 209.739 35.168 211.851 33.504C213.963 31.84 215.019 29.408 215.019 26.208C215.019 22.944 213.963 20.512 211.851 18.912C209.739 17.248 206.859 16.416 203.211 16.416H189.867ZM300.405 47.04V36.096H333.525C333.717 41.216 333.109 46.048 331.701 50.592C330.357 55.136 328.213 59.168 325.269 62.688C322.389 66.144 318.805 68.864 314.517 70.848C310.229 72.832 305.333 73.824 299.829 73.824C294.645 73.824 289.845 72.96 285.429 71.232C281.077 69.504 277.269 67.072 274.005 63.936C270.805 60.8 268.309 57.056 266.517 52.704C264.789 48.352 263.925 43.584 263.925 38.4C263.925 33.216 264.821 28.48 266.613 24.192C268.469 19.84 271.029 16.128 274.293 13.056C277.557 9.984 281.397 7.616 285.813 5.952C290.229 4.288 295.029 3.456 300.213 3.456C304.821 3.456 308.949 4.096 312.597 5.376C316.309 6.656 319.573 8.448 322.389 10.752C325.269 12.992 327.733 15.68 329.781 18.816L318.069 25.632C316.405 22.688 314.069 20.32 311.061 18.528C308.117 16.672 304.501 15.744 300.213 15.744C296.181 15.744 292.501 16.672 289.173 18.528C285.845 20.32 283.189 22.912 281.205 26.304C279.285 29.696 278.325 33.728 278.325 38.4C278.325 43.008 279.285 47.072 281.205 50.592C283.125 54.048 285.717 56.736 288.981 58.656C292.309 60.576 296.053 61.536 300.213 61.536C302.965 61.536 305.429 61.184 307.605 60.48C309.781 59.712 311.637 58.656 313.173 57.312C314.773 55.968 316.117 54.432 317.205 52.704C318.293 50.976 319.125 49.088 319.701 47.04H300.405ZM359.998 40.704H374.494L396.382 72H380.158L359.998 40.704ZM344.734 4.8H358.462V72H344.734V4.8ZM353.086 16.512V4.8H367.294C372.606 4.8 377.118 5.696 380.83 7.488C384.542 9.27999 387.39 11.776 389.374 14.976C391.358 18.176 392.35 21.92 392.35 26.208C392.35 30.432 391.358 34.176 389.374 37.44C387.39 40.64 384.542 43.136 380.83 44.928C377.118 46.72 372.606 47.616 367.294 47.616H353.086V36.672H366.43C368.862 36.672 370.942 36.288 372.67 35.52C374.462 34.688 375.838 33.536 376.798 32.064C377.758 30.528 378.238 28.704 378.238 26.592C378.238 24.48 377.758 22.688 376.798 21.216C375.838 19.68 374.462 18.528 372.67 17.76C370.942 16.928 368.862 16.512 366.43 16.512H353.086ZM413.577 56.736L415.209 45.888H447.465L449.097 56.736H413.577ZM431.145 26.592L421.065 49.728L421.353 52.8L412.521 72H397.065L431.145 0.863995L465.225 72H449.673L441.033 53.376L441.225 49.92L431.145 26.592ZM472.515 4.8H486.531V72H472.515V4.8ZM495.363 72H481.347V59.52H494.883C497.827 59.52 500.611 59.136 503.235 58.368C505.859 57.536 508.163 56.256 510.147 54.528C512.131 52.8 513.667 50.624 514.755 48C515.907 45.312 516.483 42.112 516.483 38.4C516.483 34.688 515.907 31.52 514.755 28.896C513.667 26.208 512.131 24 510.147 22.272C508.163 20.544 505.859 19.296 503.235 18.528C500.611 17.696 497.827 17.28 494.883 17.28H481.347V4.8H495.363C502.403 4.8 508.547 6.176 513.795 8.928C519.107 11.68 523.235 15.584 526.179 20.64C529.123 25.632 530.595 31.552 530.595 38.4C530.595 45.248 529.123 51.2 526.179 56.256C523.235 61.248 519.107 65.12 513.795 67.872C508.547 70.624 502.403 72 495.363 72ZM550.066 72V60.384H583.954V72H550.066ZM550.066 16.416V4.8H583.954V16.416H550.066ZM550.066 42.048V30.624H582.034V42.048H550.066ZM541.234 4.8H554.482V72H541.234V4.8Z" fill="white"/>
</svg>

<div style={{display:'flex',paddingTop:'10vh',gap:'4vw'}}>
<svg className="text" width="106" height="32" viewBox="0 0 106 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path style={{fill:'#a4c3b2'}} d="M4.48 20.6C5.06667 21.64 5.70667 22.5467 6.4 23.32C7.12 24.0933 7.90667 24.6933 8.76 25.12C9.61333 25.5467 10.5333 25.76 11.52 25.76C12.6667 25.76 13.6 25.4667 14.32 24.88C15.04 24.2933 15.4 23.4933 15.4 22.48C15.4 21.6 15.1733 20.8933 14.72 20.36C14.2933 19.8267 13.64 19.36 12.76 18.96C11.9067 18.5333 10.8533 18.08 9.6 17.6C8.93333 17.36 8.16 17.04 7.28 16.64C6.42667 16.2133 5.61333 15.68 4.84 15.04C4.06667 14.3733 3.42667 13.5733 2.92 12.64C2.41333 11.68 2.16 10.5333 2.16 9.2C2.16 7.6 2.56 6.22667 3.36 5.08C4.18667 3.90666 5.29333 3.01333 6.68 2.4C8.09333 1.76 9.66667 1.44 11.4 1.44C13.1867 1.44 14.72 1.74666 16 2.36C17.3067 2.94667 18.3867 3.70667 19.24 4.64C20.12 5.54667 20.8 6.49333 21.28 7.48L16.8 9.96C16.4267 9.29333 15.9733 8.69333 15.44 8.16C14.9333 7.6 14.3467 7.16 13.68 6.84C13.0133 6.49333 12.2533 6.32 11.4 6.32C10.28 6.32 9.44 6.58667 8.88 7.12C8.32 7.62667 8.04 8.22667 8.04 8.92C8.04 9.61333 8.26667 10.2267 8.72 10.76C9.17333 11.2667 9.86667 11.76 10.8 12.24C11.7333 12.6933 12.9067 13.16 14.32 13.64C15.2267 13.96 16.0933 14.36 16.92 14.84C17.7733 15.32 18.5333 15.9067 19.2 16.6C19.8933 17.2667 20.4267 18.0667 20.8 19C21.2 19.9067 21.4 20.96 21.4 22.16C21.4 23.52 21.1333 24.7333 20.6 25.8C20.0667 26.8667 19.3333 27.7733 18.4 28.52C17.4667 29.24 16.4133 29.7867 15.24 30.16C14.0933 30.56 12.88 30.76 11.6 30.76C9.89333 30.76 8.29333 30.44 6.8 29.8C5.33333 29.1333 4.05333 28.24 2.96 27.12C1.86667 26 1.01333 24.7867 0.4 23.48L4.48 20.6ZM45.9834 2H51.5034V31.4L31.5834 12.64V30H26.0634V0.599999L45.9834 19.36V2ZM61.4669 23.64L62.1469 19.12H75.5869L76.2669 23.64H61.4669ZM68.7869 11.08L64.5869 20.72L64.7069 22L61.0269 30H54.5869L68.7869 0.359998L82.9869 30H76.5069L72.9069 22.24L72.9869 20.8L68.7869 11.08ZM86.0244 2H91.7444V30H86.0244V2ZM89.5044 6.84V2H95.0644C97.2777 2 99.1577 2.36 100.704 3.08C102.278 3.8 103.478 4.82667 104.304 6.16C105.131 7.49333 105.544 9.08 105.544 10.92C105.544 12.7333 105.131 14.32 104.304 15.68C103.478 17.0133 102.278 18.04 100.704 18.76C99.1577 19.48 97.2777 19.84 95.0644 19.84H89.5044V15H95.0644C96.5844 15 97.7844 14.6533 98.6644 13.96C99.5444 13.2667 99.9844 12.2533 99.9844 10.92C99.9844 9.56 99.5444 8.54667 98.6644 7.88C97.7844 7.18666 96.5844 6.84 95.0644 6.84H89.5044Z" fill="white"/>
</svg>
<svg className="text" width="155" height="31" viewBox="0 0 155 31" fill="none" xmlns="http://www.w3.org/2000/svg">
<path style={{fill:'#a4c3b2'}}  d="M0.84 2H6.56V20.44C6.56 22.04 6.97333 23.3333 7.8 24.32C8.65333 25.28 9.90667 25.76 11.56 25.76C13.2133 25.76 14.4533 25.28 15.28 24.32C16.1333 23.3333 16.56 22.04 16.56 20.44V2H22.28V20.8C22.28 22.4533 22.0133 23.9067 21.48 25.16C20.9467 26.4133 20.1867 27.4667 19.2 28.32C18.24 29.1733 17.1067 29.8133 15.8 30.24C14.4933 30.6933 13.08 30.92 11.56 30.92C10.0133 30.92 8.58667 30.6933 7.28 30.24C5.97333 29.8133 4.84 29.1733 3.88 28.32C2.92 27.4667 2.17333 26.4133 1.64 25.16C1.10667 23.9067 0.84 22.4533 0.84 20.8V2ZM28.1103 2H33.8303V30H28.1103V2ZM31.5903 6.84V2H37.1503C39.3636 2 41.2436 2.36 42.7903 3.08C44.3636 3.8 45.5636 4.82667 46.3903 6.16C47.217 7.49333 47.6303 9.08 47.6303 10.92C47.6303 12.7333 47.217 14.32 46.3903 15.68C45.5636 17.0133 44.3636 18.04 42.7903 18.76C41.2436 19.48 39.3636 19.84 37.1503 19.84H31.5903V15H37.1503C38.6703 15 39.8703 14.6533 40.7503 13.96C41.6303 13.2667 42.0703 12.2533 42.0703 10.92C42.0703 9.56 41.6303 8.54667 40.7503 7.88C39.8703 7.18666 38.6703 6.84 37.1503 6.84H31.5903ZM52.0556 2H57.7756V25H68.9356V30H52.0556V2ZM75.4409 16C75.4409 17.7867 75.8143 19.3733 76.5609 20.76C77.3076 22.1467 78.3343 23.24 79.6409 24.04C80.9476 24.84 82.4676 25.24 84.2009 25.24C85.9343 25.24 87.4543 24.84 88.7609 24.04C90.0676 23.24 91.0809 22.1467 91.8009 20.76C92.5476 19.3733 92.9209 17.7867 92.9209 16C92.9209 14.2133 92.5609 12.6267 91.8409 11.24C91.1209 9.85333 90.1076 8.76 88.8009 7.96C87.4943 7.16 85.9609 6.76 84.2009 6.76C82.4676 6.76 80.9476 7.16 79.6409 7.96C78.3343 8.76 77.3076 9.85333 76.5609 11.24C75.8143 12.6267 75.4409 14.2133 75.4409 16ZM69.4009 16C69.4009 13.8667 69.7743 11.92 70.5209 10.16C71.2676 8.37333 72.3076 6.82667 73.6409 5.52C74.9743 4.21333 76.5343 3.21333 78.3209 2.52C80.1343 1.8 82.0943 1.44 84.2009 1.44C86.3343 1.44 88.2943 1.8 90.0809 2.52C91.8676 3.21333 93.4276 4.21333 94.7609 5.52C96.1209 6.82667 97.1609 8.37333 97.8809 10.16C98.6276 11.92 99.0009 13.8667 99.0009 16C99.0009 18.1067 98.6276 20.0667 97.8809 21.88C97.1609 23.6667 96.1343 25.2267 94.8009 26.56C93.4943 27.8933 91.9343 28.9333 90.1209 29.68C88.3343 30.4 86.3609 30.76 84.2009 30.76C82.0409 30.76 80.0543 30.4 78.2409 29.68C76.4543 28.9333 74.8943 27.8933 73.5609 26.56C72.2276 25.2267 71.2009 23.6667 70.4809 21.88C69.7609 20.0667 69.4009 18.1067 69.4009 16ZM106.092 23.64L106.772 19.12H120.212L120.892 23.64H106.092ZM113.412 11.08L109.212 20.72L109.332 22L105.652 30H99.2119L113.412 0.359998L127.612 30H121.132L117.532 22.24L117.612 20.8L113.412 11.08ZM130.649 2H136.489V30H130.649V2ZM140.169 30H134.329V24.8H139.969C141.196 24.8 142.356 24.64 143.449 24.32C144.543 23.9733 145.503 23.44 146.329 22.72C147.156 22 147.796 21.0933 148.249 20C148.729 18.88 148.969 17.5467 148.969 16C148.969 14.4533 148.729 13.1333 148.249 12.04C147.796 10.92 147.156 10 146.329 9.28C145.503 8.56 144.543 8.04 143.449 7.72C142.356 7.37333 141.196 7.2 139.969 7.2H134.329V2H140.169C143.103 2 145.663 2.57333 147.849 3.72C150.063 4.86667 151.783 6.49333 153.009 8.6C154.236 10.68 154.849 13.1467 154.849 16C154.849 18.8533 154.236 21.3333 153.009 23.44C151.783 25.52 150.063 27.1333 147.849 28.28C145.663 29.4267 143.103 30 140.169 30Z" fill="white"/>
</svg>
<svg className="text" width="134" height="31" viewBox="0 0 134 31" fill="none" xmlns="http://www.w3.org/2000/svg">
<path style={{fill:'#a4c3b2'}}  d="M15.64 19.6V15.04H29.44C29.52 17.1733 29.2667 19.1867 28.68 21.08C28.12 22.9733 27.2267 24.6533 26 26.12C24.8 27.56 23.3067 28.6933 21.52 29.52C19.7333 30.3467 17.6933 30.76 15.4 30.76C13.24 30.76 11.24 30.4 9.4 29.68C7.58667 28.96 6 27.9467 4.64 26.64C3.30667 25.3333 2.26667 23.7733 1.52 21.96C0.8 20.1467 0.44 18.16 0.44 16C0.44 13.84 0.813333 11.8667 1.56 10.08C2.33333 8.26667 3.4 6.72 4.76 5.44C6.12 4.16 7.72 3.17333 9.56 2.48C11.4 1.78667 13.4 1.44 15.56 1.44C17.48 1.44 19.2 1.70667 20.72 2.24C22.2667 2.77333 23.6267 3.52 24.8 4.48C26 5.41333 27.0267 6.53333 27.88 7.84L23 10.68C22.3067 9.45333 21.3333 8.46666 20.08 7.72C18.8533 6.94667 17.3467 6.56 15.56 6.56C13.88 6.56 12.3467 6.94667 10.96 7.72C9.57333 8.46666 8.46667 9.54667 7.64 10.96C6.84 12.3733 6.44 14.0533 6.44 16C6.44 17.92 6.84 19.6133 7.64 21.08C8.44 22.52 9.52 23.64 10.88 24.44C12.2667 25.24 13.8267 25.64 15.56 25.64C16.7067 25.64 17.7333 25.4933 18.64 25.2C19.5467 24.88 20.32 24.44 20.96 23.88C21.6267 23.32 22.1867 22.68 22.64 21.96C23.0933 21.24 23.44 20.4533 23.68 19.6H15.64ZM40.4703 16.96H46.5103L55.6303 30H48.8703L40.4703 16.96ZM34.1103 2H39.8303V30H34.1103V2ZM37.5903 6.88V2H43.5103C45.7236 2 47.6036 2.37333 49.1503 3.12C50.697 3.86666 51.8836 4.90666 52.7103 6.24C53.537 7.57333 53.9503 9.13333 53.9503 10.92C53.9503 12.68 53.537 14.24 52.7103 15.6C51.8836 16.9333 50.697 17.9733 49.1503 18.72C47.6036 19.4667 45.7236 19.84 43.5103 19.84H37.5903V15.28H43.1503C44.1636 15.28 45.0303 15.12 45.7503 14.8C46.497 14.4533 47.0703 13.9733 47.4703 13.36C47.8703 12.72 48.0703 11.96 48.0703 11.08C48.0703 10.2 47.8703 9.45333 47.4703 8.84C47.0703 8.2 46.497 7.72 45.7503 7.4C45.0303 7.05333 44.1636 6.88 43.1503 6.88H37.5903ZM62.795 23.64L63.475 19.12H76.915L77.595 23.64H62.795ZM70.115 11.08L65.915 20.72L66.035 22L62.355 30H55.915L70.115 0.359998L84.315 30H77.835L74.235 22.24L74.315 20.8L70.115 11.08ZM87.3525 2H93.1925V30H87.3525V2ZM96.8725 30H91.0325V24.8H96.6725C97.8992 24.8 99.0592 24.64 100.153 24.32C101.246 23.9733 102.206 23.44 103.033 22.72C103.859 22 104.499 21.0933 104.953 20C105.433 18.88 105.673 17.5467 105.673 16C105.673 14.4533 105.433 13.1333 104.953 12.04C104.499 10.92 103.859 10 103.033 9.28C102.206 8.56 101.246 8.04 100.153 7.72C99.0592 7.37333 97.8992 7.2 96.6725 7.2H91.0325V2H96.8725C99.8058 2 102.366 2.57333 104.553 3.72C106.766 4.86667 108.486 6.49333 109.713 8.6C110.939 10.68 111.553 13.1467 111.553 16C111.553 18.8533 110.939 21.3333 109.713 23.44C108.486 25.52 106.766 27.1333 104.553 28.28C102.366 29.4267 99.8058 30 96.8725 30ZM119.665 30V25.16H133.785V30H119.665ZM119.665 6.84V2H133.785V6.84H119.665ZM119.665 17.52V12.76H132.985V17.52H119.665ZM115.985 2H121.505V30H115.985V2Z" fill="white"/>
</svg>



  </div>
  <div className='btn'>
        <Drawer/>
        </div>
       


     
    </div>
  )
}
