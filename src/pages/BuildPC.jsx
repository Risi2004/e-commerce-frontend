import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import cpu from "./build-pc/Cpu";
import gpu from "./build-pc/Gpu";
import ram from "./build-pc/Ram";
import storage from "./build-pc/Storage";
import motherboard from "./build-pc/Motherboard";
import psu from "./build-pc/Psu";
import pccase from "./build-pc/PcCase";
import cooler from "./build-pc/Cooler";
import monitor from "./build-pc/Monitor";
import keyboard from "./build-pc/Keyboard";
import mouse from "./build-pc/Mouse";
import os from "./build-pc/Os";

const pcParts = {
  cpu,
  gpu,
  ram,
  storage,
  motherboard,
  psu,
  pccase,
  cooler,
  monitor,
  keyboard,
  mouse,
  os,
};

const steps = Object.keys(pcParts);

const BuildPC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState({ storage: [], ram: [] });
  const navigate = useNavigate();

  const handleSelect = (part, option) => {
    if (part === "storage" || part === "ram") {
      const current = selections[part] || [];
      const alreadySelected = current.find((item) => item.name === option.name);
      const maxLimit = part === "ram" ? 2 : 4;

      let updated;
      if (alreadySelected) {
        updated = current.filter((item) => item.name !== option.name);
      } else {
        if (current.length >= maxLimit) {
          alert(`You can select up to ${maxLimit} ${part.toUpperCase()} items only.`);
          return;
        }
        updated = [...current, option];
      }
      setSelections({ ...selections, [part]: updated });
    } else {
      setSelections({ ...selections, [part]: option });
    }
  };

  const clearAll = () => {
    setSelections({ storage: [], ram: [] });
    setCurrentStep(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const nextStep = () => {
    setCurrentStep((prev) => {
      const next = Math.min(prev + 1, steps.length);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 0);
      return next;
    });
  };

  const prevStep = () => {
    setCurrentStep((prev) => {
      const back = Math.max(prev - 1, 0);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 0);
      return back;
    });
  };

  const getTotal = () => {
    return Object.entries(selections).reduce((sum, [key, part]) => {
      if (Array.isArray(part)) {
        return sum + part.reduce((s, item) => s + item.price, 0);
      }
      return sum + (part?.price || 0);
    }, 0);
  };

  const handleSubmit = () => {
    const total = getTotal();
    navigate("/payment", { state: { selections, total } });
  };

  const part = steps[currentStep];
  const options = pcParts[part];

  const isCompatible = (part, option) => {
    const cpuSel = selections.cpu;
    const moboSel = selections.motherboard;

    switch (part) {
      case "motherboard":
        return cpuSel ? option.socket === cpuSel.socket : true;
      case "ram":
        return moboSel ? option.type === moboSel.ramType : true;
      case "cooler":
        return cpuSel
          ? option.supportedSockets.includes(cpuSel.socket) || option.supportedSockets.includes("ALL")
          : true;
      case "gpu":
        return cpuSel ? option.recommendedFor.includes(cpuSel.name) : true;
      case "psu":
        const gpuPower = selections.gpu?.requiredPower || 0;
        const cpuPower = cpuSel?.estimatedPower || 0;
        return option.wattage >= gpuPower + cpuPower + 100;
      default:
        return true;
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-blue-800">
        Build Your Custom Gaming PC 🛠️
      </h1>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-blue-700 h-3 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>
        <div className="mt-2 flex justify-between text-xs sm:text-sm text-gray-600">
          {steps.map((step, index) => (
            <div
              key={step}
              className={`text-center transition ${index === currentStep ? "text-blue-700 font-semibold" : ""
                }`}
              style={{ width: `${100 / steps.length}%` }}
            >
              {step.toUpperCase()}
            </div>
          ))}
        </div>
      </div>

      {/* Part Selection */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 tracking-wide">
          Step {currentStep + 1} of {steps.length}: <span className="uppercase text-blue-700">{part}</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {options.map((option, idx) => {
            const compatible = isCompatible(part, option);
            const isSelected = Array.isArray(selections[part])
              ? selections[part].some((item) => item.name === option.name)
              : selections[part]?.name === option.name;

            return (
              <div
                key={idx}
                onClick={() => compatible && handleSelect(part, option)}
                className={`transition transform hover:scale-105 border rounded-lg p-4 cursor-pointer duration-200 ${isSelected
                  ? "border-blue-600 bg-blue-50 shadow-md"
                  : compatible
                    ? "border-gray-300 hover:shadow-lg"
                    : "border-red-300 opacity-50 cursor-not-allowed"
                  }`}
              >
                <img
                  src={option.image}
                  alt={option.name}
                  className="h-36 w-full object-contain mb-3"
                />
                <h3 className="text-center font-bold text-gray-800">{option.name}</h3>
                <p className="text-center text-sm text-gray-600">Price: ${option.price}</p>
                {!compatible && (
                  <p className="text-xs text-center text-red-500 mt-1">Not Compatible</p>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex justify-between items-center">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="px-5 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 font-medium"
          >
            ⬅ Back
          </button>

          {currentStep < steps.length - 1 ? (
            <button
              onClick={nextStep}
              disabled={!selections[part] || (Array.isArray(selections[part]) && selections[part].length === 0)}
              className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 font-medium shadow"
            >
              Next ➡
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={Object.keys(selections).length !== steps.length}
              className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 font-medium shadow"
            >
              ✅ Confirm Build
            </button>
          )}
        </div>

        <div className="mt-6 text-right">
          <button
            onClick={clearAll}
            className="px-5 py-2 bg-red-600 text-white rounded hover:bg-red-700 font-medium shadow"
          >
            🔄 Clear All
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-12 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">🧾 Your Build Summary</h2>
        <div className="space-y-3">
          {Object.entries(selections).map(([part, choice], idx) => {
            if ((part === "storage" || part === "ram") && (!Array.isArray(choice) || choice.length === 0)) return null;
            if (!Array.isArray(choice) && !choice?.name) return null;

            return (
              <div key={idx} className="flex justify-between border-b pb-1">
                <span className="capitalize w-1/2 font-medium text-gray-700">{part}</span>
                <span className="text-right w-1/2 text-gray-700">
                  {Array.isArray(choice) ? (
                    <>
                      {choice.map((item, i) => (
                        <div key={i}>
                          {item.name} - ${item.price}
                        </div>
                      ))}
                      {choice.length > 1 && (
                        <div className="font-semibold text-blue-700">
                          Total: ${choice.reduce((s, i) => s + i.price, 0)}
                        </div>
                      )}
                    </>
                  ) : (
                    `${choice.name} - $${choice.price}`
                  )}
                </span>
              </div>
            );
          })}
        </div>
        <hr className="my-6" />
        <div className="text-right font-bold text-xl text-green-700">
          Grand Total: ${getTotal()}
        </div>
      </div>
    </div>
  );
};

export default BuildPC;
