import React, { useState } from 'react';

interface AudioControlPanelProps {
    onToggleAll: (playing: boolean) => void;
}

const AudioControlPanel: React.FC<AudioControlPanelProps> = ({ onToggleAll }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlayback = () => {
        const newState = !isPlaying;
        setIsPlaying(newState);
        onToggleAll(newState);
    };

    return (
        <div style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 1000,
            background: 'rgba(79, 195, 247, 0.9)',
            padding: '12px 20px',
            borderRadius: '25px',
            border: '2px solid white',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
        }}>
            <button
                onClick={togglePlayback}
                style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}
            >
                {isPlaying ? '🔊' : '🔇'}
                Audio 3D: {isPlaying ? 'ON' : 'OFF'}
            </button>
        </div>
    );
};

export default AudioControlPanel;
