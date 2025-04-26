import React, { useEffect, useRef } from 'react';

const RealisticRainAndIceWithLightEffect = () => {
  const canvasRef = useRef(null);
  const drops = useRef([]);
  const numberOfDrops = 250;
  const lightEffect = useRef({ x: 0, y: 0, opacity: 0, maxOpacity: 0.8 });
  let lightEffectTimer;
  const windSpeed = useRef(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Drop {
      constructor(x, y, length, speed, opacity, isIce) {
        this.x = x;
        this.y = y;
        this.length = length;
        this.speed = speed;
        this.opacity = opacity;
        this.isIce = isIce;
        this.initialY = y; // To calculate splash effect
      }

      draw() {
        ctx.save();
        ctx.beginPath();
        if (this.isIce) {
          ctx.fillStyle = `rgba(173, 216, 230, ${this.opacity})`;
          ctx.arc(this.x, this.y, this.length / 2, 0, Math.PI * 2, false);
          ctx.fill();
        } else {
          const gradient = ctx.createLinearGradient(this.x, this.y, this.x, this.y + this.length);
          gradient.addColorStop(0, `rgba(174, 194, 224, ${this.opacity})`);
          gradient.addColorStop(1, `rgba(174, 194, 224, 0)`);
          ctx.strokeStyle = gradient;
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(this.x + windSpeed.current, this.y + this.length);
          ctx.lineWidth = 2;
          ctx.lineCap = 'round';
          ctx.stroke();

          // Draw splash effect
          if (this.y >= canvas.height) {
            ctx.beginPath();
            ctx.arc(this.x, this.initialY + this.length, 5, 0, Math.PI * 2, false);
            ctx.fillStyle = `rgba(174, 194, 224, 0.5)`;
            ctx.fill();
          }
        }
        ctx.restore();
      }

      update() {
        this.y += this.speed;
        this.x += windSpeed.current * 0.5;

        // Reset position if the drop goes beyond the canvas
        if (this.y > canvas.height + this.length) {
          this.y = -this.length; // Reset above the canvas
          this.x = Math.random() * canvas.width; // Randomize horizontal position
        }

        this.draw();
      }
    }

    const initDrops = () => {
      drops.current.length = 0;
      for (let i = 0; i < numberOfDrops; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const length = Math.random() * 20 + 10;
        const speed = Math.random() * 2 + 1; // Slower speed (1 to 3)
        const opacity = Math.random() * 0.5 + 0.5;
        const isIce = Math.random() < 0.1; // 10% chance of being an ice chunk
        drops.current.push(new Drop(x, y, length, speed, opacity, isIce));
      }
    };

    const animateDrops = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw light effect
      if (lightEffect.current.opacity > 0) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(lightEffect.current.x, lightEffect.current.y, 200, 0, Math.PI * 2, false);
        const gradient = ctx.createRadialGradient(
          lightEffect.current.x,
          lightEffect.current.y,
          0,
          lightEffect.current.x,
          lightEffect.current.y,
          200
        );
        gradient.addColorStop(0, `rgba(255, 255, 224, ${lightEffect.current.opacity})`);
        gradient.addColorStop(1, `rgba(255, 255, 224, 0)`);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.restore();
        lightEffect.current.opacity -= 0.02;
      }

      // Update and draw drops
      drops.current.forEach(drop => drop.update());

      requestAnimationFrame(animateDrops);
    };

    const triggerLightEffect = () => {
      lightEffect.current.x = Math.random() * canvas.width;
      lightEffect.current.y = Math.random() * canvas.height;
      lightEffect.current.opacity = lightEffect.current.maxOpacity;
    };

    const changeWindSpeed = () => {
      windSpeed.current = Math.random() * 2 - 1; // Change wind speed randomly
    };

    initDrops();
    animateDrops();
    lightEffectTimer = setInterval(triggerLightEffect, 3000); // Light effect every 3 seconds
    const windSpeedTimer = setInterval(changeWindSpeed, 5000);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      clearInterval(lightEffectTimer);
      clearInterval(windSpeedTimer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #1e3c72, #2a5298)',
      }}
    />
  );
};

export default RealisticRainAndIceWithLightEffect;
