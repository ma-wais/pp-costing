import React, { useState, useEffect } from "react";

const PPCoastingCalculator = () => {
  const [inputs, setInputs] = useState({
    readySizeX: 23,
    readySizeY: 39,
    sides: 2,
    ups: 1,
  });
  const [results, setResults] = useState({});

  const [tableInputs, setTableInputs] = useState({
    A12: 2,
    B12: 8,
    E14: 640,
    D16: 100,
    E15: 780,
    E16: 3000,
    E17: 970,
    E18: 3.2,
    E21: 180,
    H21: 155,
    E22: 230,
    E23: 205,
    E24: 315,
  });
  const { A12, B12, E14, D16, E15, E16, E17, E18, E21, H21, E22, E23, E24 } =
    tableInputs;
  const { readySizeX, readySizeY, sides, ups } = inputs;

  const F16 =
    Math.round(
      readySizeX * (readySizeY + 1.5) * sides * 0.0000032 * 1000 * 100
    ) / 100;
  const F14 = E14 + 5 + (E14 + 5) * (A12 / 100);
  const H14 = E14 + 25 + (E14 + 25) * (A12 / 100);
  const H15 = E15 + 5 + (E15 + 5) * (A12 / 100);
  const H16 = (F16 / 1000) * E16 * (D16 / 100);
  const F18 = (E18 / ups) * sides;
  const F19 = readySizeX * 0.057;
  const E19 = (F19 / 1000) * E17 + 0.5;

  const calculateResults = () => {
    const calculateJ = (weight, index) => {
      if (index === 0 || index === 1 || index === 2 || index === 5) {
        return (weight / 1000) * F14 + (H16 + F18 + E19);
      } else if (index === 3 || index === 4) {
        return (weight / 1000) * H14 + H16 + F18 + E19;
      } else {
        return (weight / 1000) * H15 + H16 + F18 + E19;
      }
    };

    const calculateI = (j) => j * (B12 / 100);

    const specifications = [
      { spec: "18,20,22,23,25,27" },
      { spec: "18 Low Gram" },
      { spec: "18 H" },
      { spec: "13,15 N" },
      { spec: "15 H" },
      { spec: "23 H" },
      { spec: "PP Craft" },
    ];

    const newResults = specifications.map((item, index) => {
      let weight;
      if (index === 0 || index === 3) {
        weight = (E21 / 1550) * readySizeX * (readySizeY + 1.5);
      } else if (index === 1) {
        weight = (H21 / 1550) * readySizeX * (readySizeY + 1.5);
      } else if (index === 2 || index === 4) {
        weight = (E22 / 1550) * readySizeX * (readySizeY + 1.5);
      } else if (index === 5) {
        weight = (E23 / 1550) * readySizeX * (readySizeY + 1.5);
      } else {
        weight = (E24 / 1550) * readySizeX * (readySizeY + 1.5);
      }

      const j = calculateJ(weight, index);
      const i = calculateI(j);

      return {
        specifications: item.spec,
        rate: Math.ceil((i + j) / 0.5) * 0.5,
        weight: weight.toFixed(0),
        i: i.toFixed(2),
        j: (index === 2 || index === 4 || index === 5 ? j + 2 : j).toFixed(2),
      };
    });

    setResults({ table: newResults });
  };

  useEffect(() => {
    calculateResults();
  }, [inputs, tableInputs]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: parseFloat(value) }));
  };

  const handleTableInputChange = (e) => {
    const { name, value } = e.target;
    setTableInputs((prev) => ({ ...prev, [name]: parseFloat(value) }));
  };

  return (
    <div>
      <h2>PP Coasting Calculator</h2>

      <div className="inputs">
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

      <div className="input-group">
        <input
          type="number"
          name="A12"
          value={tableInputs.A12}
          onChange={handleTableInputChange}
        />
        <input
          type="number"
          name="B12"
          value={tableInputs.B12}
          onChange={handleTableInputChange}
        />
      </div>
      <div className="additional-inputs">
        <div className="input-group">
          <h3>Rate PP</h3>
          <label>
            E14:{" "}
            <input
              type="number"
              name="E14"
              value={tableInputs.E14}
              onChange={handleTableInputChange}
            />
          </label>
          <label>
            F14:{" "}
            <input
              type="number"
              name="F14"
              value={F14}
              onChange={handleTableInputChange}
            />
          </label>
          <label>
            H14:{" "}
            <input
              type="number"
              name="H14"
              value={H14}
              onChange={handleTableInputChange}
            />
          </label>
        </div>
        <div className="input-group">
          <h3>Rate Craft</h3>
          <label>
            E15:{" "}
            <input
              type="number"
              name="E15"
              value={tableInputs.E15}
              onChange={handleTableInputChange}
            />
          </label>
          <label>
            H15:{" "}
            <input
              type="number"
              name="H15"
              value={H15}
              onChange={handleTableInputChange}
            />
          </label>
        </div>
        <div className="input-group">
          <h3>Ink</h3>
          <label>
            D16(percentage):{" "}
            <input
              type="number"
              max={100}
              min={0}
              name="D16"
              value={tableInputs.D16}
              onChange={handleTableInputChange}
            />
          </label>
          <label>
            E16:{" "}
            <input
              type="number"
              name="E16"
              value={tableInputs.E16}
              onChange={handleTableInputChange}
            />
          </label>
          <label>
            F16:{" "}
            <input
              type="number"
              name="F16"
              value={F16}
              onChange={handleTableInputChange}
            />
          </label>
          <label>
            H16:{" "}
            <input
              type="number"
              name="H16"
              value={H16}
              onChange={handleTableInputChange}
            />
          </label>
        </div>
        <div className="input-group">
          <h3>Thread</h3>
          <label>
            E17:{" "}
            <input
              type="number"
              name="E17"
              value={tableInputs.E17}
              onChange={handleTableInputChange}
            />
          </label>
        </div>
        <div className="input-group">
          <h3>L/E</h3>
          <label>
            E18:{" "}
            <input
              type="number"
              name="E18"
              value={tableInputs.E18}
              onChange={handleTableInputChange}
            />
          </label>
          <label>
            F18:{" "}
            <input
              type="number"
              name="F18"
              value={F18}
              onChange={handleTableInputChange}
            />
          </label>
        </div>
        <div className="input-group">
          <h3>Sttich</h3>
          <label>
            E19:{" "}
            <input
              type="number"
              name="E19"
              value={Number(E19).toFixed(2)}
              onChange={handleTableInputChange}
            />
          </label>
          <label>
            F19:{" "}
            <input
              type="number"
              name="F19"
              value={F19}
              onChange={handleTableInputChange}
            />
          </label>
        </div>
        <div className="input-group">
          <h3>PP N</h3>
          <label>
            E21:{" "}
            <input
              type="number"
              name="E21"
              value={tableInputs.E21}
              onChange={handleTableInputChange}
            />
          </label>
          <label>
            H21:{" "}
            <input
              type="number"
              name="H21"
              value={tableInputs.H21}
              onChange={handleTableInputChange}
            />
          </label>
        </div>
        <div className="input-group">
          <h3>PP H</h3>
          <label>
            E22:{" "}
            <input
              type="number"
              name="E22"
              value={tableInputs.E22}
              onChange={handleTableInputChange}
            />
          </label>
        </div>
        <div className="input-group">
          <h3>PP H 23</h3>
          <label>
            E23:{" "}
            <input
              type="number"
              name="E23"
              value={tableInputs.E23}
              onChange={handleTableInputChange}
            />
          </label>
        </div>
        <div className="input-group">
          <h3>PP Craft</h3>
          <label>
            E24:{" "}
            <input
              type="number"
              name="E24"
              value={tableInputs.E24}
              onChange={handleTableInputChange}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default PPCoastingCalculator;
