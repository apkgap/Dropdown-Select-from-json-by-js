<?php
/**
 * Plugin Name: Chillerlan QR Code
 * Plugin URI: https://github.com/chillerlan/php-qrcode
 * Description: A simple plugin to generate QR codes using the chillerlan/php-qrcode library.
 * Version: 1.0.0
 * Author: Jules
 * Author URI: https://github.com/jules-agent
 * License: MIT
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

// Include the Composer autoloader.
require_once __DIR__ . '/vendor/autoload.php';

use chillerlan\QRCode\QRCode;
use chillerlan\QRCode\QROptions;

/**
 * Shortcode handler for generating QR codes.
 *
 * [qrcode data="your data here"]
 *
 * @param array $atts Shortcode attributes.
 * @return string The QR code image tag.
 */
function chillerlan_qrcode_shortcode_handler( $atts ) {
	$atts = shortcode_atts(
		array(
			'data' => 'https://www.wordpress.org',
		),
		$atts,
		'qrcode'
	);

	$data = $atts['data'];

	if ( empty( $data ) ) {
		return '<!-- QR Code: No data provided -->';
	}

	$options = new QROptions(
		[
			'outputType' => QRCode::OUTPUT_IMAGE_PNG,
			'eccLevel'   => QRCode::ECC_L,
			'scale'      => 5,
			'imageBase64'=> true,
		]
	);

	try {
		$qrcode = new QRCode( $options );
		$imageData = $qrcode->render( $data );
		return sprintf( '<img src="%s" alt="QR Code" />', esc_attr( $imageData ) );
	} catch ( \Exception $e ) {
		return '<!-- QR Code Error: ' . esc_html( $e->getMessage() ) . ' -->';
	}
}

add_shortcode( 'qrcode', 'chillerlan_qrcode_shortcode_handler' );
