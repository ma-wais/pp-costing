import React, { useState, useEffect } from "react";

const PPCoastingCalculator = () => {
  const [inputs, setInputs] = useState({
    readySizeX: 23,
    readySizeY: 39,
    sides: 2,
    ups: 1,
  });
  const [results, setResults] = useState({});

  const A12 = 0.02;
  const B12 = 0.08;
  const E14 = 640;
  const D16 = 1;
  const E15 = 780;
  const E16 = 3000;
  const E17 = 970;
  const E18 = 3.2;
  const E21 = 180;
  const H21 = 155;
  const E22 = 230;
  const E23 = 205;
  const E24 = 215;

  const F16 =
    Math.round(
      inputs.readySizeX *
        (inputs.readySizeY + 1.5) *
        inputs.sides *
        0.0000032 *
        1000 *
        100
    ) / 100;
  console.log("F16", F16);
  const F14 = E14 + 5 + (E14 + 5) * A12;
  const H14 = E14 + 25 + (E14 + 25) * A12;
  const H15 = E15 + 5 + (E15 + 5) * A12;
  const H16 = (F16 / 1000) * E16 * D16;
  console.log("H16", H16);
  const F18 = (E18 / inputs.ups) * inputs.sides;
  console.log("F18", F18);
  const F19 = inputs.readySizeX * 0.057;
  console.log("F19", F19);
  const E19 = (F19 / 1000) * E17 + 0.5;
  console.log("E19", E19);

  const calculateResults = () => {
    const calculateJ = (weight,index) => {
      return index === 0 || index === 1 || index === 2 || index === 5
        ? (weight / 1000) * F14 + (H16 + F18 + E19)
        : index === 3 || index === 4
        ? (weight / 1000) * H14 + H16 + F18 + E19
        : (weight / 1000) * H15 + H16 + F18 + E19;
    };

    const calculateI = (j) => {
      return j * B12;
    };

    const specifications = [
      { spec: "18,20,22,23,25,27", weight: 108 },
      { spec: "18 Low Gram", weight: 93 },
      { spec: "18 H", weight: 138 },
      { spec: "13,15 N", weight: 108 },
      { spec: "15 H", weight: 138 },
      { spec: "23 H", weight: 123 },
      { spec: "PP Craft", weight: 189 },
    ];

    const newResults = specifications.map((item, index) => {
      let weight =
        index === 0 || index === 3
          ? (E21 / 1550) * inputs.readySizeX * (inputs.readySizeY + 1.5)
          : index === 1
          ? (H21 / 1550) * inputs.readySizeX * (inputs.readySizeY + 1.5)
          : index === 2 || index === 4
          ? (E22 / 1550) * inputs.readySizeX * (inputs.readySizeY + 1.5)
          : index === 5
          ? (E23 / 1550) * inputs.readySizeX * (inputs.readySizeY + 1.5)
          : (E24 / 1550) * inputs.readySizeX * (inputs.readySizeY + 1.5);
      console.log("weight", weight);
      const j = calculateJ(weight, index);
      const i = calculateI(j);

      return {
        specifications: item.spec,
        rate: item.rate,
        weight: weight,
        i: i.toFixed(1),
        j: index === 2 || index === 4 || index === 5 ? j + 2 : j,
      };
    });

    setResults({
      table: newResults,
    });
  };

  useEffect(() => {
    calculateResults();
  }, [inputs]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: parseFloat(value) }));
  };

  return (
    <div>
      <h2>PP Coasting Calculator</h2>
      <div>
        <div>
          <label htmlFor="readySizeX">Ready Size X</label>
          <input
            type="number"
            name="readySizeX"
            value={inputs.readySizeX}
            onChange={handleInputChange}
            placeholder="Ready Size X"
          />
          <label htmlFor="readySizeY">Ready Size Y</label>
          <input
            type="number"
            name="readySizeY"
            value={inputs.readySizeY}
            onChange={handleInputChange}
            placeholder="Ready Size Y"
          />
        </div>
        <div>
          <label htmlFor="sides">Sides</label>
          <input
            type="number"
            name="sides"
            value={inputs.sides}
            onChange={handleInputChange}
            placeholder="Sides"
          />
          <label htmlFor="ups">Ups</label>
          <input
            type="number"
            name="ups"
            value={inputs.ups}
            onChange={handleInputChange}
            placeholder="Ups"
          />
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Specifications</th>
            <th>Rate</th>
            <th>Weight</th>
            <th>I</th>
            <th>J</th>
          </tr>
        </thead>
        <tbody>
          {results.table &&
            results.table.map((row, index) => (
              <tr key={index}>
                <td>{row.specifications}</td>
                <td>
                  {Math.ceil((Number(row.i) + Number(row.j)) / 0.5) * 0.5}
                </td>
                <td>{Number(row.weight).toFixed(0)}</td>
                <td>{Number(row.i).toFixed(2)}</td>
                <td>{Number(row.j).toFixed(2)}</td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* <div>
        <h2>Additional Results</h2>
        <p>Rate PP: {results.ratePP}</p>
        <p>Rate Craft: {results.rateCraft}</p>
        <p>
          Ink: {results.ink?.value1} / {results.ink?.value2}
        </p>
        <p>L/E: {results.le}</p>
        <p>
          Stitch: {results.stitch?.value1} / {results.stitch?.value2}
        </p>
      </div> */}
    </div>
  );
};

export default PPCoastingCalculator;
