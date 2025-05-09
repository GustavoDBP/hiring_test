import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Stats.module.css";

const Stats = () => {
    const navigate = useNavigate();

    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statistics, setStatistics] = useState({});

    const userID = localStorage.getItem('userID');

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/memory/data/${userID}`);
                setStats(response.data || []);
            } catch (error) {
                console.error('Error fetching stats:', error);
                navigate('play');
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [userID]);

    useEffect(() => {
        if (!stats || stats.length === 0) {
            setStatistics({
                easy: {
                    totalGames: 0,
                    totalWins: 0,
                    totalTime: 0,
                    winsPercentage: 0,
                    averageTime: 0,
                },
                normal: {
                    totalGames: 0,
                    totalWins: 0,
                    totalTime: 0,
                    winsPercentage: 0,
                    averageTime: 0,
                },
                hard: {
                    totalGames: 0,
                    totalWins: 0,
                    totalTime: 0,
                    winsPercentage: 0,
                    averageTime: 0,
                }
            });
            return;
        }

        const easyGames = stats.filter(item => item.difficulty === 'Easy');
        const normalGames = stats.filter(item => item.difficulty === 'Normal');
        const hardGames = stats.filter(item => item.difficulty === 'Hard');

        const calculateStatistics = (games) => {
            const totalGames = games.length;
            const totalWins = games.filter(game => game.completed === 1).length;
            const totalTime = games.reduce((acc, game) => acc + game.timeTaken, 0);
            const winsPercentage = totalGames > 0 ? (totalWins / totalGames) * 100 : 0;
            const averageTime = totalGames > 0 ? (totalTime / totalGames) : 0;

            return {
                totalGames,
                totalWins,
                totalTime,
                winsPercentage,
                averageTime,
            };
        }

        const easyStats = calculateStatistics(easyGames);
        const normalStats = calculateStatistics(normalGames);
        const hardStats = calculateStatistics(hardGames);

        setStatistics({
            easy: easyStats,
            normal: normalStats,
            hard: hardStats,
        });
    }, [stats]);


    return (
        <div className={styles.container}>
            <h1 className={styles.gameTitle}>
                WonderCards
            </h1>
            <div className={styles.statsContainer}>
                <div className={styles.statsHeader}>
                    <h2>
                        Game Statistics
                    </h2>
                </div>
                <div className={styles.statsContent}>
                    <table className={styles.statsTable}>
                        <thead>
                            <tr>
                                <th>Difficulty</th>
                                <th>Total Games</th>
                                <th>Total Wins</th>
                                <th>Wins Percentage</th>
                                <th>Average Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="6">Loading...</td></tr>
                            ) : (
                                Object.keys(statistics).map((difficulty) => (
                                    <tr key={difficulty}>
                                        <td>{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</td>
                                        <td>{statistics[difficulty].totalGames}</td>
                                        <td>{statistics[difficulty].totalWins}</td>
                                        <td>{statistics[difficulty].winsPercentage.toFixed(1)}%</td>
                                        <td>{statistics[difficulty].averageTime.toFixed(1)}s</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                <div className={styles.statsFooter}>
                    <button onClick={() => navigate('/play')} className={styles.menuButton}>
                        Menu
                    </button>
                </div>
            </div>
        </div>
    );

};

export default Stats;