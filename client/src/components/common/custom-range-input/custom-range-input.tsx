import React, { useEffect, useState, useRef } from 'react';
import {
  ICustomRangeInputProps,
  IOnChangeEventProps
} from './custom-range-input.types';

const CustomRangeInput = (props: ICustomRangeInputProps) => {
  const { min, max, onChange, reload } = props;

  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const [minInput, setMinInput] = useState(min);
  const [maxInput, setMaxInput] = useState(max);

  const [isDragging, setIsDragging] = useState(false);

  const minGap = 5;

  const sliderTrackRef = useRef<HTMLDivElement>(null);

  // Function to emit onChange event
  const emitChange = (data: IOnChangeEventProps) => {
    if (onChange) {
      onChange(data);
    }
  };

  const slideMin = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= min && maxVal - value >= minGap) {
      setMinVal(value);
      setMinInput(value);
      emitChange({ min: value, max: maxVal });
    }
  };

  const slideMax = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value <= max && value - minVal >= minGap) {
      setMaxVal(value);
      setMaxInput(value);
      emitChange({ min: minVal, max: value });
    }
  };

  const setSliderTrack = () => {
    if (sliderTrackRef.current) {
      const minPercent = ((minVal - min) / (max - min)) * 100;
      const maxPercent = ((maxVal - min) / (max - min)) * 100;

      // Dynamic adjust bar size for styling
      sliderTrackRef.current.style.left = `${minPercent}%`;
      sliderTrackRef.current.style.right = `${100 - maxPercent}%`;
    }
  };

  useEffect(() => {
    if (reload) {
      setMinVal(min);
      setMaxVal(max);
      setMinInput(min);
      setMaxInput(max);
    }
  }, [reload]);

  useEffect(() => {
    setSliderTrack();
  }, [minVal, maxVal]);

  const handleMinInput = (e) => {
    const value = e.target.value === '' ? min : parseInt(e.target.value, 10);
    if (value >= min && value < maxVal - minGap) {
      setMinInput(value);
      setMinVal(value);
      emitChange({ min: value, max: maxVal });
    }
  };

  const handleMaxInput = (e) => {
    const value = e.target.value === '' ? max : parseInt(e.target.value, 10);
    if (value <= max && value > minVal + minGap) {
      setMaxInput(value);
      setMaxVal(value);
      emitChange({ min: minVal, max: value });
    }
  };

  const handleInputKeyDown = (e, type) => {
    if (e.key === 'Enter') {
      const value = parseInt(e.target.value, 10);
      if (type === 'min' && value >= min && value < maxVal - minGap) {
        setMinVal(value);
        emitChange({ min: value, max: maxVal });
      } else if (type === 'max' && value <= max && value > minVal + minGap) {
        setMaxVal(value);
        emitChange({ min: minVal, max: value });
      }
    }
  };

  const startDrag = () => {
    setIsDragging(true);
  };

  const stopDrag = () => {
    setIsDragging(false);
  };

  return (
    <div className="custom-range-input">
      <div className="custom-range-input__input-container">
        <div className="custom-range-input__min-input-container">
          <input
            type="number"
            value={minInput}
            onChange={handleMinInput}
            onKeyDown={(e) => handleInputKeyDown(e, 'min')}
            className="custom-range-input__min-input"
            min={min}
            max={maxVal - minGap}
          />
        </div>
        <div className="custom-range-input__max-input-container">
          <input
            type="number"
            value={maxInput}
            onChange={handleMaxInput}
            onKeyDown={(e) => handleInputKeyDown(e, 'max')}
            className="custom-range-input__max-input"
            min={minVal + minGap}
            max={max}
          />
        </div>
      </div>
      <div className="custom-range-input__range-container">
        <div
          ref={sliderTrackRef}
          className="custom-range-input__slider-track"
        ></div>
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          onChange={slideMin}
          onMouseDown={startDrag}
          onMouseUp={stopDrag}
          onTouchStart={startDrag}
          onTouchEnd={stopDrag}
          className="custom-range-input__min-range"
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          onChange={slideMax}
          onMouseDown={startDrag}
          onMouseUp={stopDrag}
          onTouchStart={startDrag}
          onTouchEnd={stopDrag}
          className="custom-range-input__max-range"
        />
        {isDragging && (
          <div className="custom-range-input__min-tooltip">{minVal}</div>
        )}
        {isDragging && (
          <div className="custom-range-input__max-tooltip">{maxVal}</div>
        )}
      </div>
    </div>
  );
};

export default CustomRangeInput;
