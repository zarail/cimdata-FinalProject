module.exports = (config) => {
	/*   Hilfsvariablen, um zwischen schneller lokaler Entwicklung ("Development") und optimierter
  Erzeugung des Codes, der tatsächlich online gestellt wird ("Production"), zu unterscheiden.  */
	const isProduction = config.env === 'production';

	/*   Nur nötig, wenn man OpenProps nutzt. Sorgt dafür, dass nur die Variablen
  in der CSS-Datei landen, die auch benutzt werden. (JIT steht für Just in Time-Compiler,
    also nur das verwenden, was gerade verwendet wird.) */
	const postcssJitProps = require('postcss-jit-props');
	const OpenProps = require('open-props');

	/* Fügt mit @import importierte Dateien zu einer Datei zusammen. */
	const atImport = require('postcss-import');

	/* Konvertiert so weit wie möglich neuen in alten CSS-Syntax,
  Mögliche Optionen für postcssPresetEnv:
  https://github.com/csstools/postcss-plugins/tree/main/plugin-packs/postcss-preset-env#options
 CSS-Features:
 https://github.com/csstools/postcss-plugins/blob/main/plugin-packs/postcss-preset-env/FEATURES.md 
  */
	const postcssPresetEnv = require('postcss-preset-env');

	const plugins = [
		atImport(),
		postcssJitProps(OpenProps),
		postcssPresetEnv({
			features: {
				'custom-properties': false, // CSS-Variablen nicht mit direktem Wert (z.B. Farbe) verdoppeln
				'custom-selectors': true, // @custom-selector erlauben
			},
		}),
	];

	if (isProduction) {
		// Optimiere (verkleinere) Dateien nur im Production-Modus.
		plugins.push(require('cssnano'));
	}

	return {
		plugins,
		map: {
			inline: false,
		},
	};
};
