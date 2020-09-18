import React from "react";

export default [
  {
    value: "cases_accumulated",
    label: "Cases",
    label_es: "Casos",
    desc: "Cases (cumulative).",
    desc_es: "Casos (acumulado).",
    max: 120000,
  },
  {
    value: "new_cases",
    label: "New cases reported",
    label_es: "Nuevos casos",
    desc: "New cases.",
    desc_es: "Nuevos casos.",
    max: 2000,
  },
  {
    value: "deceased",
    label: "Deaths",
    label_es: "Muertos",
    desc: "Deaths (cumulative).",
    desc_es: "Muertes (acumulado).",
    max: 15000,
  },
  {
    value: "activos",
    label: "Active cases",
    label_es: "Casos activos",
    desc: "Active cases.",
    desc_es: "Casos activos.",
    max: 12000,
  },
  {
    value: "recovered",
    label: "Recovered",
    label_es: "Recuperados",
    desc: "Recovered (cumulative).",
    desc_es: "Recuperados (acumulado).",
    max: 25000,
  },
  {
    value: "hospitalized",
    label: "Hospitalized",
    label_es: "Hospitalizados",
    max: 1000,
    desc: (
      <p>
        Hospitalized.{" "}
        <a
          href="https://github.com/montera34/escovid19data/wiki#hospitalizados"
          title="Wiki"
          target="_blank"
          rel="noopener noreferrer"
        >
          Mix of cumulative and daily.
        </a>
      </p>
    ),
    desc_es: (
      <p>
        Hospitalizados.
        <a
          href="https://github.com/montera34/escovid19data/wiki#hospitalizados"
          title="Wiki"
          target="_blank"
          rel="noopener noreferrer"
        >
          Mezcla acumulados y diarios.
        </a>
      </p>
    ),
    max: 80000,
  },
  {
    value: "intensive_care",
    label: "Intensive care",
    label_es: "Cuidados intensivos",
    desc: "Intensive care patients. Cumulative.",
    desc_es: "Pacientes UCI. Acumulado.",
    max: 6000,
  },
  {
    value: "daily_cases",
    label: "Daily cases",
    label_es: "Casos diarios",
    desc: "Daily cases. Calculated.",
    desc_es: "Casos diarios. Calculado.",
    max: 4000,
  },
  {
    value: "daily_cases_avg7",
    label: "Daily cases avg 7 days",
    label_es: "Casos diarios media 7 d.",
    desc: "Average daily cases in the last 7 days.",
    desc_es: "Media de casos diarios en la última semana.",
    max: 5000,
  },
  {
    value: "cases_per_cienmil",
    label: "Cases per 100K",
    label_es: "Casos por 100k hab.",
    desc: "Cumulative cases per 100,000 inhabitants.",
    desc_es: "Casos por cada 100.000 habitantes (acumulado).",
    max: 3000,
  },
  {
    value: "intensive_care_per_1000000",
    label: "Intensive care per 1M",
    label_es: "UCI por 1m hab.",
    desc: "Cumulative cases per 1,000,000 inhabitants.",
    desc_es: "Pacientes UCI. Casos por cada 1.000.000 habitantes (acumulado).",
    max: 60,
  },
  {
    value: "deceassed_per_100000",
    label: "Deaths per 100K",
    label_es: "Muertos por 100k hab.",
    desc: "Cumulative deaths per 100,000 inhabitants.",
    desc_es: "Muertes por cada 100.000 habitantes (acumulado).",
    max: 250,
  },
  {
    value: "daily_deaths",
    label: "Daily deaths",
    label_es: "Muertes diarias",
    desc: "Reported daily deaths.",
    desc_es: "Muertes diarias reportadas (calculado).",
    max: 500,
  },
  {
    value: "daily_deaths_inc",
    label: "Daily deaths inc.",
    label_es: "Muertes diarias inc.",
    desc:
      "Daily deaths. Calculated as the percentage from last day (cumulative).",
    desc_es: "Incremento porcentual de muertes sobre el día anterior.",
    max: 1000,
  },
  {
    value: "daily_deaths_avg3",
    label: "Daily deaths avg. 3 days",
    label_es: "Media muertes 3 d.",
    desc: "Average daily deaths in the last 3 days.",
    desc_es: "Media de muertes diarias en los últimos 3 días.",
    max: 500,
  },
  {
    value: "daily_deaths_avg7",
    label: "Daily deaths avg. 7 days",
    label_es: "Media muertes 7 d.",
    desc: "Average daily deaths in the last 7 days.",
    desc_es: "Media de muertes diarias en los últimos 7 días.",
    max: 500,
  },
  {
    value: "deaths_last_week",
    label: "Deaths last week",
    label_es: "Muertes última semana",
    desc: "Deaths in the last 7 d.",
    desc_es: "Muertes en la última semana.",
    max: 2500,
  },
  {
    value: "PCR",
    label: "PCR. New cases",
    label_es: "PCR. Nuevos casos",
    desc: "New cases detected with PCR.",
    desc_es: "Nuevos casos detectados por PCR.",
    max: 2000,
  },
  {
    value: "cases_accumulated_PCR",
    label: "PCR. Cumulative",
    label_es: "PCR. Acumulado",
    desc: "Cases detected with PCR (cumulative).",
    desc_es: "Casos detectados por PCR (acumulado).",
    max: 200000,
  },
  {
    value: "daily_cases_PCR_avg7",
    label: "PCR avg. 7 days",
    label_es: "PCR. media 7 d.",
    desc: "Average daily cases PCR in the last 7 days.",
    desc_es: "Media de casos detectados por PCR (7 días).",
    max: 4000,
  },
  {
    value: "TestAc",
    label: "AC. New cases",
    label_es: "AC. Nuevos casos",
    desc: "New cases detected with Ac.",
    desc_es: "Nuevos casos detectados por test de anticuerpos.",
    max: 70000,
  },
];
