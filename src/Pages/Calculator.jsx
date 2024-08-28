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
  const E18 = 3.2;
  const F16 =
    inputs.readySizeX *
    (inputs.readySizeY + 1.5) *
    inputs.sides *
    0.0000032 *
    1000;
  const F14 = E14 + 5 + (E14 + 5) * A12;
  const H14 = E14 + 25 + (E14 + 25) * A12;
  const H15 = E15 + 5 + (E15 + 5) * A12;
  const H16 = (F16 / 1000) * E16 * D16;
  const F18 = (E18 / inputs.ups) * inputs.sides;
  const E19 = 1.872;

  const calculateResults = () => {
    const { readySizeX, readySizeY, sides, ups } = inputs;

    const calculateJ = (weight, index) => {
      return index === 0 || index === 1 || index === 2 || index === 5
        ? (weight / 1000) * F14 + H16 + F18 + E19
        : index === 3 || index === 4
        ? (weight / 1000) * H14 + H16 + F18 + E19
        : (weight / 1000) * H15 + H16 + F18 + E19;
    };

    const calculateI = (j) => {
      return j * B12;
    };

    const specifications = [
      { spec: "18,20,22,23,25,27", rate: 105.5, weight: 108 },
      { spec: "18 Low Gram", rate: 94.5, weight: 93 },
      { spec: "18 H", rate: 129.0, weight: 138 },
      { spec: "13,15 N", rate: 107.5, weight: 108 },
      { spec: "15 H", rate: 132.0, weight: 138 },
      { spec: "23 H", rate: 118.0, weight: 123 },
      { spec: "PP Craft", rate: 192.0, weight: 189 },
    ];

    const newResults = specifications.map((item, index) => {
      const j = calculateJ(item.weight, index);
      const i = calculateI(j);

      return {
        specifications: item.spec,
        rate: item.rate.toFixed(1),
        weight: item.weight,
        i: i.toFixed(1),
        j:
          index === 2 || index === 4 || index === 5
            ? (j + 2).toFixed(1)
            : j.toFixed(1),
      };
    });

    // const ratePP = (640 + 5 + (640 + 5) * 0.08).toFixed(2);
    // const rateCraft = (780 + 5 + (780 + 5) * 0.08).toFixed(2);

    // const ink = {
    //   value1: (sides * (ups + 1.5) * readySizeX * 0.0000032 * 1000).toFixed(2),
    //   value2: ((6.0 / 1000) * 3000 * readySizeX).toFixed(2),
    // };

    // const le = ((970 / readySizeY) * readySizeX).toFixed(2);

    // const stitch = {
    //   value1: ((1.772 / 1000) * 970 + 0.5).toFixed(3),
    //   value2: (0.057 * readySizeX).toFixed(3),
    // };

    setResults({
      table: newResults,
    //   ratePP,
    //   rateCraft,
    //   ink,
    //   le,
    //   stitch,
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
      <h1>PP Coasting Calculator</h1>
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
                <td>{row.rate}</td>
                <td>{row.weight}</td>
                <td>{row.i}</td>
                <td>{row.j}</td>
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
