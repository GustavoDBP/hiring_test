import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import backgroundGif from "../assets/images/play.gif";
import calmBackground from "../assets/images/calm-wallpaper.jpg";
import { X } from "lucide-react";
import "./Play.css";
import services from "../dependency-injection";

const modalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    zIndex: 999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  content: {
    backgroundColor: "#1e1e2e",
    border: "2px solid #4a4e69",
    borderRadius: "20px",
    padding: "40px",
    maxWidth: "600px",
    height: "300px",
    width: "fit-content",
    color: "#fff",
    textAlign: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    overflow: "hidden",
  },
};

const modalPlayStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    zIndex: 999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  content: {
    backgroundColor: "#1e1e2e",
    border: "2px solid #4a4e69",
    borderRadius: "20px",
    padding: "40px",
    maxWidth: "600px",
    height: "200px",
    width: "fit-content",
    color: "#fff",
    textAlign: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    overflow: "hidden",
  },
};

const Play = () => {
  const navigate = useNavigate();
  const [SettingsmodalIsOpen, setModalSettingIsOpen] = useState(false);
  const [PlaymodalIsOpen, setModalPlayIsOpen] = useState(false);
  const [difficulty, setDifficulty] = useState(null);
  const [isCalmMode, setIsCalmMode] = useState(false);

  const handleBgVolumeChange = (event) => {
    const newVolume = parseInt(event.target.value, 10);
    services.settingsService.setSetting("bgVolume", newVolume);
  };

  const handleSfxVolumeChange = (event) => {
    const newVolume = parseInt(event.target.value, 10);
    services.settingsService.setSetting("sfxVolume", newVolume);
  };

  const SettingopenModal = () => {
    setModalSettingIsOpen(true);
    services.audioService.playClickSound();
  };

  const SettingcloseModal = () => {
    setModalSettingIsOpen(false);
    services.audioService.playClickSound();

  };

  const PlayopenModal = () => {
    services.audioService.playClickSound();

    setModalPlayIsOpen(true);
  };

  const PlaycloseModal = () => {
    services.audioService.playClickSound();

    setModalPlayIsOpen(false);
  };

  const handleDifficultySelect = (level) => {
    setDifficulty(level);
  };

  const handleStatsButtonClick = () => {
    services.audioService.playClickSound();

    const userID = localStorage.getItem("userID");
    if (!userID) {
      alert("UserID is missing. Please log in again.");
      navigate("/login");
      return;
    }
    navigate("/stats");
  };

  const handlePlay = () => {
    services.audioService.playClickSound();

    const userID = localStorage.getItem("userID");
    if (!userID) {
      alert("UserID is missing. Please log in again.");
      return;
    }
    localStorage.setItem("gameStarted", "true");

    if (isCalmMode) {
      if (difficulty === "red") {
        navigate("/calm-hard");
      } else if (difficulty === "yellow") {
        navigate("/calm-medium");
      } else if (difficulty === "green") {
        navigate("/calm-easy");
      } else {
        alert(`Selected difficulty: ${difficulty}`);
      }
    } else {
      if (difficulty === "red") {
        navigate("/memory-card-game");
      } else if (difficulty === "yellow") {
        navigate("/medium");
      } else if (difficulty === "green") {
        navigate("/easy");
      } else {
        alert(`Selected difficulty: ${difficulty}`);
      }
    }
  };

  return (
    <div
      className="background-container"
      style={{
        backgroundImage: `url(${isCalmMode ? calmBackground : backgroundGif})`,
      }}
    >
      <h1 className={`game-title ${isCalmMode ? "calm-title" : ""}`}>
        WonderCards
      </h1>

      <div className="button-container">
        <button
          className={`game-button ${isCalmMode ? "calm-button" : ""}`}
          onClick={PlayopenModal}
          onMouseEnter={() => { services.audioService.playHoverSound() }}
        >
          Play
        </button>
        <button
          className={`game-button ${isCalmMode ? "calm-button" : ""}`}
          onClick={() => {
            services.audioService.playClickSound();
            alert("Instructions coming soon!");
          }}
          onMouseEnter={() => { services.audioService.playHoverSound() }}
        >
          Instructions
        </button>
        <button
          className={`game-button ${isCalmMode ? "calm-button" : ""}`}
          onClick={handleStatsButtonClick}
          onMouseEnter={() => { services.audioService.playHoverSound() }}
        >
          Stats
        </button>
        <button
          className={`game-button ${isCalmMode ? "calm-button" : ""}`}
          onClick={SettingopenModal}
          onMouseEnter={() => { services.audioService.playHoverSound() }}
        >
          Settings
        </button>
      </div>
      <Modal
        isOpen={SettingsmodalIsOpen}
        onRequestClose={SettingcloseModal}
        style={{
          ...modalStyles,
          content: {
            ...modalStyles.content,
            backgroundColor: isCalmMode ? "#86a17d" : "#1e1e2e",
            color: isCalmMode ? "#ffffff" : "#fff",
          },
        }}
      >
        <button
          onClick={SettingcloseModal}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#fff",
          }}
        >
          <X size={24} />
        </button>

        <h2 className={`${isCalmMode ? "calm-mode-label" : ""} modal-h2`}>
          Background Music
        </h2>
        <div className="volume-control">
          <input
            type="range"
            min="0"
            max="100"
            defaultValue={services.settingsService.getSettingOrDefault("bgVolume", 50)}
            onChange={handleBgVolumeChange}
            className="volume-slider"
          />
        </div>

        <h2 className={`${isCalmMode ? "calm-mode-label" : ""} modal-h2`}>
          Sound Effects
        </h2>
        <div className="volume-control">
          <input
            type="range"
            min="0"
            max="100"
            defaultValue={services.settingsService.getSettingOrDefault("sfxVolume", 50)}
            onChange={handleSfxVolumeChange}
            className="volume-slider"
          />
        </div>

        {/* <div className="calm-mode">
          <h2 className={`${isCalmMode ? "calm-mode-label" : ""} modal-h2`}>
            Calm Mode
          </h2>
          <label className="switch">
            <input
              type="checkbox"
              checked={isCalmMode}
              onChange={toggleCalmMode}
            />
            <span className="slider round"></span>
          </label>
        </div> */}
      </Modal>

      <Modal
        isOpen={PlaymodalIsOpen}
        onRequestClose={PlaycloseModal}
        style={{
          ...modalPlayStyles,
          content: {
            ...modalPlayStyles.content,
            backgroundColor: isCalmMode ? "#86a17d" : "#1e1e2e",
            color: isCalmMode ? "#ffffff" : "#fff",
            maxWidth: "75%"
          },
        }}
      >
        <button
          onClick={PlaycloseModal}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#fff",
          }}
        >
          <X size={24} />
        </button>

        <h2 className={`${isCalmMode ? "calm-mode-label" : ""} modal-h2`}>
          Select Difficulty
        </h2>
        <div className="difficulty-selection">
          <button
            onClick={() => {
              handleDifficultySelect("green");
              services.audioService.playClickSound();
            }}
            className={`difficulty-button green ${difficulty === "green" && !isCalmMode ? "selected" : ""
              } ${isCalmMode && difficulty === "green" ? "calm-selected" : ""}`}
            onMouseEnter={() => { services.audioService.playHoverSound() }}
          >
            Easy
          </button>
          <button
            onClick={() => {
              handleDifficultySelect("yellow");
              services.audioService.playClickSound();
            }}
            className={`difficulty-button yellow ${difficulty === "yellow" && !isCalmMode ? "selected" : ""
              } ${isCalmMode && difficulty === "yellow" ? "calm-selected" : ""}`}
            onMouseEnter={() => { services.audioService.playHoverSound() }}
          >
            Normal
          </button>
          <button
            onClick={() => {
              handleDifficultySelect("red");
              services.audioService.playClickSound();
            }}
            className={`difficulty-button red ${difficulty === "red" && !isCalmMode ? "selected" : ""
              } ${isCalmMode && difficulty === "red" ? "calm-selected" : ""}`}
            onMouseEnter={() => { services.audioService.playHoverSound() }}
          >
            Hard
          </button>
        </div>

        <div>
          <button
            onClick={handlePlay}
            className="play-button"
            onMouseEnter={() => { services.audioService.playHoverSound() }}
          >
            Accept
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Play;
