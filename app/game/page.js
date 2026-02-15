'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

const GRID_SIZE = 20;
const CELL_SIZE = 20; // Visual size in pixels (handled by CSS, this is logical)
const SPEED = 150;

export default function SnakeGame() {
    const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
    const [food, setFood] = useState({ x: 5, y: 5 });
    const [direction, setDirection] = useState('RIGHT');
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [highScore, setHighScore] = useState(0);

    // Swipe Handling
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    // Minimum swipe distance
    const minSwipeDistance = 50;

    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart({ x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY });
    };

    const onTouchMove = (e) => {
        setTouchEnd({ x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY });
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distanceX = touchStart.x - touchEnd.x;
        const distanceY = touchStart.y - touchEnd.y;
        const isLeftSwipe = distanceX > minSwipeDistance;
        const isRightSwipe = distanceX < -minSwipeDistance;
        const isUpSwipe = distanceY > minSwipeDistance;
        const isDownSwipe = distanceY < -minSwipeDistance;

        if (Math.abs(distanceX) > Math.abs(distanceY)) {
            // Horizontal
            if (isLeftSwipe && direction !== 'RIGHT') setDirection('LEFT');
            if (isRightSwipe && direction !== 'LEFT') setDirection('RIGHT');
        } else {
            // Vertical
            if (isUpSwipe && direction !== 'DOWN') setDirection('UP');
            if (isDownSwipe && direction !== 'UP') setDirection('DOWN');
        }
    };

    // Generate random food position not on snake
    const generateFood = useCallback(() => {
        let newFood;
        while (true) {
            newFood = {
                x: Math.floor(Math.random() * GRID_SIZE),
                y: Math.floor(Math.random() * GRID_SIZE),
            };
            // Check if food is on snake
            // eslint-disable-next-line no-loop-func
            const isOnSnake = snake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
            if (!isOnSnake) break;
        }
        setFood(newFood);
    }, [snake]);

    // Handle Game Over
    const handleGameOver = () => {
        setGameOver(true);
        setIsPlaying(false);
        if (score > highScore) {
            setHighScore(score);
            localStorage.setItem('snakeHighScore', score.toString());
        }
    };

    // Reset Game
    const resetGame = () => {
        setSnake([{ x: 10, y: 10 }]);
        setDirection('RIGHT');
        setGameOver(false);
        setScore(0);
        setIsPlaying(true);
        generateFood();
    };

    // Game Loop
    useEffect(() => {
        if (!isPlaying || gameOver) return;

        const moveSnake = setInterval(() => {
            setSnake(prevSnake => {
                const head = { ...prevSnake[0] };

                switch (direction) {
                    case 'UP': head.y -= 1; break;
                    case 'DOWN': head.y += 1; break;
                    case 'LEFT': head.x -= 1; break;
                    case 'RIGHT': head.x += 1; break;
                    default: break;
                }

                // Check Wall Collision
                if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
                    handleGameOver();
                    return prevSnake;
                }

                // Check Self Collision
                if (prevSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
                    handleGameOver();
                    return prevSnake;
                }

                const newSnake = [head, ...prevSnake];

                // Check Food Collision
                if (head.x === food.x && head.y === food.y) {
                    setScore(s => s + 10);
                    generateFood();
                    // Don't pop the tail, so it grows
                } else {
                    newSnake.pop(); // Remove tail
                }

                return newSnake;
            });
        }, SPEED);

        return () => clearInterval(moveSnake);
    }, [direction, isPlaying, gameOver, food, generateFood]);

    // key controls
    useEffect(() => {
        const handleKeyPress = (e) => {
            switch (e.key) {
                case 'ArrowUp': if (direction !== 'DOWN') setDirection('UP'); break;
                case 'ArrowDown': if (direction !== 'UP') setDirection('DOWN'); break;
                case 'ArrowLeft': if (direction !== 'RIGHT') setDirection('LEFT'); break;
                case 'ArrowRight': if (direction !== 'LEFT') setDirection('RIGHT'); break;
                default: break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        // Load high score
        const saved = localStorage.getItem('snakeHighScore');
        if (saved) setHighScore(parseInt(saved));

        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [direction]);

    return (
        <div
            className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 touch-none"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            <Link href="/" className="absolute top-4 left-4 text-slate-400 hover:text-white">&larr; Back to Cricket</Link>

            <h1 className="text-4xl font-bold text-emerald-400 mb-2">Secret Snake Game 🐍</h1>
            <p className="text-slate-400 mb-6">Swipe or use arrows to play!</p>

            <div className="relative bg-slate-800 border-4 border-slate-700 rounded-lg shadow-2xl overflow-hidden"
                style={{ width: 400, height: 400 }}>

                {/* Game Over Overlay */}
                {gameOver && (
                    <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-10">
                        <h2 className="text-3xl font-bold text-red-500 mb-4">Game Over!</h2>
                        <p className="text-white text-xl mb-6">Score: {score}</p>
                        <button
                            onPointerDown={resetGame}
                            className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3 px-8 rounded-full transition-transform hover:scale-105"
                        >
                            Play Again
                        </button>
                    </div>
                )}

                {/* Start Overlay */}
                {!isPlaying && !gameOver && (
                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center z-10">
                        <button
                            onPointerDown={resetGame}
                            className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3 px-8 rounded-full transition-transform hover:scale-105"
                        >
                            Start Game
                        </button>
                    </div>
                )}

                {/* Grid */}
                <div className="w-full h-full relative">
                    {/* Food */}
                    <div
                        className="absolute bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.8)]"
                        style={{
                            width: '5%',
                            height: '5%',
                            left: `${(food.x / GRID_SIZE) * 100}%`,
                            top: `${(food.y / GRID_SIZE) * 100}%`
                        }}
                    />

                    {/* Snake */}
                    {snake.map((segment, i) => (
                        <div
                            key={i}
                            className={`absolute ${i === 0 ? 'bg-emerald-400 z-10' : 'bg-emerald-600'}`}
                            style={{
                                width: '5%',
                                height: '5%',
                                left: `${(segment.x / GRID_SIZE) * 100}%`,
                                top: `${(segment.y / GRID_SIZE) * 100}%`,
                                borderRadius: i === 0 ? '4px' : '2px'
                            }}
                        />
                    ))}
                </div>
            </div>

            <div className="mt-6 flex justify-between w-[400px] text-white font-mono text-xl">
                <div>Score: {score}</div>
                <div>High Score: {highScore}</div>
            </div>

            {/* On-Screen Controls (Visible on all touch devices, using Pointer events) */}
            <div className="mt-8 grid grid-cols-3 gap-2 touch-none">
                <div></div>
                <button
                    onPointerDown={(e) => { e.preventDefault(); if (direction !== 'DOWN') setDirection('UP'); }}
                    className="bg-slate-700 p-4 rounded-lg active:bg-slate-600 active:scale-95 transition-transform select-none"
                >⬆️</button>
                <div></div>
                <button
                    onPointerDown={(e) => { e.preventDefault(); if (direction !== 'RIGHT') setDirection('LEFT'); }}
                    className="bg-slate-700 p-4 rounded-lg active:bg-slate-600 active:scale-95 transition-transform select-none"
                >⬅️</button>
                <button
                    onPointerDown={(e) => { e.preventDefault(); if (direction !== 'UP') setDirection('DOWN'); }}
                    className="bg-slate-700 p-4 rounded-lg active:bg-slate-600 active:scale-95 transition-transform select-none"
                >⬇️</button>
                <button
                    onPointerDown={(e) => { e.preventDefault(); if (direction !== 'LEFT') setDirection('RIGHT'); }}
                    className="bg-slate-700 p-4 rounded-lg active:bg-slate-600 active:scale-95 transition-transform select-none"
                >➡️</button>
            </div>
        </div>
    );
}
