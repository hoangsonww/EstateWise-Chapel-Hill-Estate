import { Request, Response } from "express";
import { queryProperties } from "../scripts/queryProperties";

export interface Listing {
  id: string;
  score: number;
  price: number;
  bedrooms: number;
  bathrooms: number;
  livingArea: number;
  yearBuilt: number;
  homeType: string;
  homeStatus: string;
  city: string;
  zipcode?: string;
  [key: string]: any;
}

/**
 * Builds a pie chart config for home type distribution.
 * @param listings Array of property listings
 */
function buildHomeTypeDistribution(listings: Listing[]) {
  const counts: Record<string, number> = {};
  listings.forEach((l) => {
    const t = l.homeType || "Unknown";
    counts[t] = (counts[t] || 0) + 1;
  });
  return {
    type: "pie",
    data: {
      labels: Object.keys(counts),
      datasets: [{ label: "Home Types", data: Object.values(counts) }],
    },
    options: { responsive: true, plugins: { legend: { position: "top" } } },
  };
}

/**
 * Builds a bar chart config for bedrooms distribution.
 * @param listings Array of property listings
 */
function buildBedroomsDistribution(listings: Listing[]) {
  const counts: Record<string, number> = {};
  listings.forEach((l) => {
    const b = l.bedrooms.toString();
    counts[b] = (counts[b] || 0) + 1;
  });
  return {
    type: "bar",
    data: {
      labels: Object.keys(counts),
      datasets: [{ label: "Bedrooms", data: Object.values(counts) }],
    },
    options: { responsive: true, plugins: { legend: { position: "top" } } },
  };
}

/**
 * Builds a bar chart config for bathrooms distribution.
 * @param listings Array of property listings
 */
function buildBathroomsDistribution(listings: Listing[]) {
  const counts: Record<string, number> = {};
  listings.forEach((l) => {
    const b = l.bathrooms.toString();
    counts[b] = (counts[b] || 0) + 1;
  });
  return {
    type: "bar",
    data: {
      labels: Object.keys(counts),
      datasets: [{ label: "Bathrooms", data: Object.values(counts) }],
    },
    options: { responsive: true, plugins: { legend: { position: "top" } } },
  };
}

/**
 * Builds a histogram-like bar chart for price distribution.
 * @param listings Array of property listings
 */
function buildPriceDistribution(listings: Listing[]) {
  const prices = listings.map((l) => l.price).sort((a, b) => a - b);
  if (!prices.length) return null;
  const bins = 5;
  const min = prices[0],
    max = prices[prices.length - 1];
  const width = (max - min) / bins;
  const counts = Array(bins).fill(0);
  listings.forEach((l) => {
    const idx = Math.min(Math.floor((l.price - min) / width), bins - 1);
    counts[idx]++;
  });
  const labels = counts.map(
    (_, i) =>
      `$${Math.round(min + i * width)}–${Math.round(min + (i + 1) * width)}`,
  );
  return {
    type: "bar",
    data: { labels, datasets: [{ label: "Price Range", data: counts }] },
    options: {
      responsive: true,
      scales: {
        x: { title: { display: true, text: "Price" } },
        y: { title: { display: true, text: "Count" } },
      },
    },
  };
}

/**
 * Builds a histogram-like bar chart for living area distribution.
 * @param listings Array of property listings
 */
function buildLivingAreaDistribution(listings: Listing[]) {
  const areas = listings.map((l) => l.livingArea).sort((a, b) => a - b);
  if (!areas.length) return null;
  const bins = 5;
  const min = areas[0],
    max = areas[areas.length - 1];
  const width = (max - min) / bins;
  const counts = Array(bins).fill(0);
  listings.forEach((l) => {
    const idx = Math.min(Math.floor((l.livingArea - min) / width), bins - 1);
    counts[idx]++;
  });
  const labels = counts.map(
    (_, i) =>
      `${Math.round(min + i * width)}–${Math.round(min + (i + 1) * width)} sqft`,
  );
  return {
    type: "bar",
    data: { labels, datasets: [{ label: "Living Area", data: counts }] },
    options: {
      responsive: true,
      scales: {
        x: { title: { display: true, text: "Sqft" } },
        y: { title: { display: true, text: "Count" } },
      },
    },
  };
}

/**
 * Builds a bar chart for year built distribution.
 * @param listings Array of property listings
 */
function buildYearBuiltDistribution(listings: Listing[]) {
  const counts: Record<string, number> = {};
  listings.forEach((l) => {
    const y = l.yearBuilt.toString();
    counts[y] = (counts[y] || 0) + 1;
  });
  return {
    type: "bar",
    data: {
      labels: Object.keys(counts),
      datasets: [{ label: "Year Built", data: Object.values(counts) }],
    },
    options: { responsive: true, plugins: { legend: { position: "top" } } },
  };
}

/**
 * Builds a scatter chart for price vs living area.
 * @param listings Array of property listings
 */
function buildPriceAreaTrend(listings: Listing[]) {
  const pts = listings.map((l) => ({ x: l.livingArea, y: l.price }));
  return {
    type: "scatter",
    data: { datasets: [{ label: "Price vs Area", data: pts }] },
    options: {
      responsive: true,
      scales: {
        x: { title: { display: true, text: "Sqft" } },
        y: { title: { display: true, text: "$" } },
      },
    },
  };
}

/**
 * Builds a line chart for price over year built.
 * @param listings Array of property listings
 */
function buildPriceYearTrend(listings: Listing[]) {
  const sorted = [...listings].sort((a, b) => a.yearBuilt - b.yearBuilt);
  return {
    type: "line",
    data: {
      labels: sorted.map((l) => l.yearBuilt.toString()),
      datasets: [
        {
          label: "Price over Year",
          data: sorted.map((l) => l.price),
          fill: false,
        },
      ],
    },
    options: { responsive: true },
  };
}

/**
 * Builds a bar chart for price per square foot distribution.
 * @param listings Array of property listings
 */
function buildPricePerSqftDistribution(listings: Listing[]) {
  const values = listings
    .map((l) => +(l.price / (l.livingArea || 1)).toFixed(2))
    .sort((a, b) => a - b);
  if (!values.length) return null;
  const bins = 5;
  const min = values[0],
    max = values[values.length - 1];
  const width = (max - min) / bins;
  const counts = Array(bins).fill(0);
  values.forEach((v) => {
    const idx = Math.min(Math.floor((v - min) / width), bins - 1);
    counts[idx]++;
  });
  const labels = counts.map(
    (_, i) =>
      `$${(min + i * width).toFixed(0)}–${(min + (i + 1) * width).toFixed(0)}`,
  );
  return {
    type: "bar",
    data: { labels, datasets: [{ label: "Price per Sqft", data: counts }] },
    options: { responsive: true },
  };
}

/**
 * Builds a bubble chart for bedrooms vs bathrooms.
 * @param listings Array of property listings
 */
function buildBedsBathsScatter(listings: Listing[]) {
  const pts = listings.map((l) => ({ x: l.bedrooms, y: l.bathrooms, r: 5 }));
  return {
    type: "bubble",
    data: { datasets: [{ label: "Beds vs Baths", data: pts }] },
    options: { responsive: true },
  };
}

/**
 * Builds a bar chart for average price by home type.
 * @param listings Array of property listings
 */
function buildAveragePriceByHomeType(listings: Listing[]) {
  const sums: Record<string, number> = {},
    counts: Record<string, number> = {};
  listings.forEach((l) => {
    sums[l.homeType] = (sums[l.homeType] || 0) + l.price;
    counts[l.homeType] = (counts[l.homeType] || 0) + 1;
  });
  const labels = Object.keys(sums);
  const data = labels.map((t) => sums[t] / counts[t]);
  return {
    type: "bar",
    data: { labels, datasets: [{ label: "Avg Price", data }] },
    options: { responsive: true },
  };
}

/**
 * Builds a bar chart for count by zipcode.
 * @param listings Array of property listings
 */
function buildCountByZipcode(listings: Listing[]) {
  const counts: Record<string, number> = {};
  listings.forEach((l) => {
    const z = l.zipcode || "N/A";
    counts[z] = (counts[z] || 0) + 1;
  });
  return {
    type: "bar",
    data: {
      labels: Object.keys(counts),
      datasets: [{ label: "Count by Zip", data: Object.values(counts) }],
    },
    options: { responsive: true },
  };
}

/**
 * Builds a doughnut chart for home status distribution.
 * @param listings Array of property listings
 */
function buildHomeStatusDistribution(listings: Listing[]) {
  const counts: Record<string, number> = {};
  listings.forEach((l) => {
    const s = l.homeStatus || "Unknown";
    counts[s] = (counts[s] || 0) + 1;
  });
  return {
    type: "doughnut",
    data: {
      labels: Object.keys(counts),
      datasets: [{ label: "Home Status", data: Object.values(counts) }],
    },
    options: { responsive: true },
  };
}

/**
 * Builds a bar chart for count by city.
 * @param listings Array of property listings
 */
function buildCountByCity(listings: Listing[]) {
  const counts: Record<string, number> = {};
  listings.forEach((l) => {
    const c = l.city || "Unknown";
    counts[c] = (counts[c] || 0) + 1;
  });
  return {
    type: "bar",
    data: {
      labels: Object.keys(counts),
      datasets: [{ label: "Count by City", data: Object.values(counts) }],
    },
    options: { responsive: true },
  };
}

/**
 * Builds a bar chart for average living area by home type.
 * @param listings Array of property listings
 */
function buildAverageLivingAreaByHomeType(listings: Listing[]) {
  const sums: Record<string, number> = {},
    counts: Record<string, number> = {};
  listings.forEach((l) => {
    sums[l.homeType] = (sums[l.homeType] || 0) + l.livingArea;
    counts[l.homeType] = (counts[l.homeType] || 0) + 1;
  });
  const labels = Object.keys(sums);
  const data = labels.map((t) => sums[t] / counts[t]);
  return {
    type: "bar",
    data: { labels, datasets: [{ label: "Avg Living Area", data }] },
    options: { responsive: true },
  };
}

/**
 * Builds a bar chart for score distribution.
 * @param listings Array of property listings
 */
function buildScoreDistribution(listings: Listing[]) {
  const buckets: Record<string, number> = {};
  listings.forEach((l) => {
    const b = Math.floor(l.score * 10) / 10; // bucket by 0.1
    const label = `${b.toFixed(1)}-${(b + 0.1).toFixed(1)}`;
    buckets[label] = (buckets[label] || 0) + 1;
  });
  return {
    type: "bar",
    data: {
      labels: Object.keys(buckets),
      datasets: [{ label: "Score Range", data: Object.values(buckets) }],
    },
    options: { responsive: true },
  };
}

/**
 * Builds a scatter chart for price vs score.
 * @param listings Array of property listings
 */
function buildScorePriceScatter(listings: Listing[]) {
  const pts = listings.map((l) => ({ x: l.score, y: l.price }));
  return {
    type: "scatter",
    data: { datasets: [{ label: "Price vs Score", data: pts }] },
    options: {
      responsive: true,
      scales: {
        x: { title: { display: true, text: "Score" } },
        y: { title: { display: true, text: "$" } },
      },
    },
  };
}

/**
 * Builds a scatter chart for living area vs year built.
 * @param listings Array of property listings
 */
function buildAreaYearScatter(listings: Listing[]) {
  const pts = listings.map((l) => ({ x: l.yearBuilt, y: l.livingArea }));
  return {
    type: "scatter",
    data: { datasets: [{ label: "Area vs Year", data: pts }] },
    options: {
      responsive: true,
      scales: {
        x: { title: { display: true, text: "Year" } },
        y: { title: { display: true, text: "Sqft" } },
      },
    },
  };
}

/**
 * GET /api/properties?q=…&topK=…
 * Fetch property data, parse metadata, and return listings with chart configurations.
 * @param req Express request
 * @param res Express response
 */
export async function getPropertyData(req: Request, res: Response) {
  try {
    const q = String(req.query.q || "");
    const topK = Number(req.query.topK) || 500;
    const raw = await queryProperties(q, topK);
    const listings: Listing[] = raw.map((r) => {
      const m = r.metadata as any;
      const addr = JSON.parse(m.address || "{}");
      return {
        id: r.id,
        score: r.score || 0,
        price: Number(m.price) || 0,
        bedrooms: Number(m.bedrooms) || 0,
        bathrooms: Number(m.bathrooms) || 0,
        livingArea: Number(m.livingArea) || 0,
        yearBuilt: Number(m.yearBuilt) || 0,
        homeType: String(m.homeType || ""),
        homeStatus: String(m.homeStatus || ""),
        city: String(m.city || ""),
        zipcode: String(addr.zipcode || ""),
      };
    });

    const charts = {
      homeType: buildHomeTypeDistribution(listings),
      bedrooms: buildBedroomsDistribution(listings),
      bathrooms: buildBathroomsDistribution(listings),
      priceDist: buildPriceDistribution(listings),
      areaDist: buildLivingAreaDistribution(listings),
      yearBuiltDist: buildYearBuiltDistribution(listings),
      priceArea: buildPriceAreaTrend(listings),
      priceYear: buildPriceYearTrend(listings),
      pricePerSqft: buildPricePerSqftDistribution(listings),
      bedsBaths: buildBedsBathsScatter(listings),
      avgPriceType: buildAveragePriceByHomeType(listings),
      countByZip: buildCountByZipcode(listings),
      homeStatus: buildHomeStatusDistribution(listings),
      countByCity: buildCountByCity(listings),
      avgAreaType: buildAverageLivingAreaByHomeType(listings),
      scoreDist: buildScoreDistribution(listings),
      scorePrice: buildScorePriceScatter(listings),
      areaYear: buildAreaYearScatter(listings),
    };

    res.json({ listings, charts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch property data" });
  }
}
