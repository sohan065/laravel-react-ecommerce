<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{

    protected $fillable = [
        'code',
        'discount',
        'discount_type',
        'min_purchase',
        'usage_count',
        'usage_limit',
        'expires_at',
        'is_active',
    ];


    protected $casts = [
        'expires_at' => 'datetime',
    ];
}
