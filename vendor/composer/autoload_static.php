<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInite5e40a73bab4b4bc2f83d1a292adeec0
{
    public static $prefixLengthsPsr4 = array (
        'P' => 
        array (
            'PHPMailer\\PHPMailer\\' => 20,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'PHPMailer\\PHPMailer\\' => 
        array (
            0 => __DIR__ . '/..' . '/phpmailer/phpmailer/src',
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInite5e40a73bab4b4bc2f83d1a292adeec0::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInite5e40a73bab4b4bc2f83d1a292adeec0::$prefixDirsPsr4;

        }, null, ClassLoader::class);
    }
}
