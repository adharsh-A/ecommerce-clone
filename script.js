    window.addEventListener("load", () => {
        let birthday = "2024,10,27";

        (function () {
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const countDown = new Date(birthday).getTime();
        x = setInterval(function () {
            const now = new Date().getTime();
            const distance = countDown - now;

            document.getElementById("days").innerText = setNumber(
            distance / day
            );

            document.getElementById("hours").innerText = setNumber(
            (distance % day) / hour
            );
            document.getElementById("minutes").innerText = setNumber(
            (distance % hour) / minute
            );
            animateFlip(seconds, Math.floor((distance % minute) / second));

            //do something later when date is reached
            if (distance < 0) {
            let headline = document.getElementById("headline"),
                countdown = document.getElementById("countdown"),
                content = document.getElementById("content");

            headline.innerText = "It's my birthday!";
            countdown.style.display = "none";
            content.style.display = "block";

            clearInterval(x);
            }
        }, 1000);
        })();

        function animateFlip(element, value) {
        const valueInDom = element.querySelector(".bottom-back").innerText;
        const currentValue = value < 10 ? "0" + value : "" + value;

        if (valueInDom === currentValue) return;

        element.querySelector(".top-back span").innerText = currentValue;
        element.querySelector(".bottom-back span").innerText = currentValue;

        gsap.to(element.querySelector(".top"), 0.7, {
            rotationX: "-180deg",
            transformPerspective: 300,
            ease: Quart.easeOut,
            onComplete: function () {
            element.querySelector(".top").innerText = currentValue;
            element.querySelector(".bottom").innerText = currentValue;
            gsap.set(element.querySelector(".top"), { rotationX: 0 });
            },
        });

        gsap.to(element.querySelector(".top-back"), 0.7, {
            rotationX: 0,
            transformPerspective: 300,
            ease: Quart.easeOut,
            clearProps: "all",
        });
        }

        function setNumber(num) {
        const res = Math.floor(num);
        return res >= 10 ? res : `0${res}`;
        }
    });