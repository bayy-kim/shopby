import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const categories = [
  { id: "cat-elektronik", name: "Elektronik", slug: "elektronik" },
  { id: "cat-fashion", name: "Fashion", slug: "fashion" },
  { id: "cat-rumah-tangga", name: "Rumah Tangga", slug: "rumah-tangga" },
  { id: "cat-kecantikan", name: "Kecantikan", slug: "kecantikan" },
] as const

const products = [
  {
    name: "Mechanical Keyboard Pro",
    price: 450000,
    discountPct: null,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAStz6MWdhJ1zh4c0FwFqadWl6CZq5yq6-UlVR_qmFH3_loMLyyqbx3zne-khm5hPTJvfh1jA52Rnza1u51vuol1UW2bCTvHPHKqORb1UGD1RNbFG_MVh5A69rXC3IbEtRojtC9QmdCOivROrbCKT-ltHi0VDusfzZFZ263onsWtLZ8Kq0Em-IwzPQHBRdFNez08kHupdRaWZE1ZJY7to6Yaw_Fb-3xKMD806mIvw6va3dJeJvMrTegl9c3V-SVYZdaZlca2ZD5_Wc",
    imageAlt:
      "A modern minimalist mechanical keyboard on a pristine white desk setup, top-down view, sharp lighting, high contrast utilitarian aesthetic, highly detailed.",
    shopeeUrl: "https://shopee.co.id/Mechanical-Keyboard-Pro",
    categoryId: "cat-elektronik",
    isFeatured: true,
  },
  {
    name: "Steel Tumbler 500ml",
    price: 120000,
    discountPct: null,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAq3uVOfDHT35zefCDRgrqt2khWekMJD-uhSl5FzLgypPRdHepB2_ejWNHK7FJCA0zRbKqNm4IE_3qScrEx0KQ96sUDbjCmvhA5kryVfBw3OJltTCotP_W8vgbo-3JYrifB7rSWiOioLD-98KffR6uva4DWoA_nNdmcUaplsTn1ph53oD9lCo3xbgFvX21dBmBTmgewH6TWmU4G-ADl2QFPnXkGSbsOvC2zXHFkRLCyBaUhxbF7Sb5V8ff8tYaOZbg9n-7gDWxfF4I",
    imageAlt:
      "A sleek minimalist stainless steel coffee tumbler on a concrete surface, dramatic lighting casting a hard shadow, brutalist industrial aesthetic, highly detailed.",
    shopeeUrl: "https://shopee.co.id/Steel-Tumbler-500ml",
    categoryId: "cat-rumah-tangga",
    isFeatured: true,
  },
  {
    name: "Smartwatch Series X",
    price: 899000,
    discountPct: null,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBn6tiaGUPteAmiqvMS8GBrLbLllyzvq9vz7tdY5qpHZQkMXQXfVaBGt9mZu63T5QyqZhWMj3PDMFOhbIvMmJZ6aeA7W-_NU3MzxVaeuAA6aByS4TlSRrSFkLRG092a2k3xaHzucB4xqsjRtBARo_d6Q3kHGngd3ONDaIYerVf0u2L1K_cg5Bi4dUp4w18VV_n-3mZ38M1HkW7wFKdceOpBVNpyckoCNkxuMKczv67_QO7AzMxZsgQihouxA_rxw8ikkFkDG-c0EIg",
    imageAlt:
      "A minimalist white smartwatch on a stark white pedestal, studio lighting, crisp shadows, modern utilitarian design, highly detailed.",
    shopeeUrl: "https://shopee.co.id/Smartwatch-Series-X",
    categoryId: "cat-elektronik",
    isFeatured: true,
  },
  {
    name: "Minimalist Leather Wallet",
    price: 250000,
    discountPct: null,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCjMlrxENOsc_SpAqLhzrszDKoRb9ZiUOa47e64uOGuv7vbbpw4wJcLzzWhwE-4RIDxWiRx6pxWM-h6MUzeeqsexh-oBoff6iNOAapFlGQdsBNUABGBxoiEGpa-OVLCXApAK0ozKogsRoPk96VYyBhxDZ08Fl0rJFMT-VxlGEcebp-5gOiO2nHv5AT1YKPPa-8DTyKBTjXhasIrXhrIT3Z9hy_yYE4KBtFsWzGpoc7VRiVruu8aDmsQ5woo-dyUtqRh_tDW3XoJLdA",
    imageAlt:
      "A premium minimalist leather wallet lying on a matte grey surface, top-down perspective, high contrast, clean lines, professional photography.",
    shopeeUrl: "https://shopee.co.id/Minimalist-Leather-Wallet",
    categoryId: "cat-fashion",
    isFeatured: false,
  },
  {
    name: "Ceramic Pour Over Set",
    price: 320000,
    discountPct: null,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCj2UFr8HGa5YTtNcn4Y_ldycaAq4zmwW4C2aTZp3xIywkBH9MbtbRV7sJLxCxVYEzvxYs1b3ZalFmuByzeJ-h8dftpe5Lm0xeaGPzgdfz0Z924zMzwogZapiXnUuqXn1sSACgmWQIHCCaIlXhK7Sul2QlPzekC4l2Vdqs2jS4LvjVQDB5pJLTQKGMclHDlUoo3P1oboPXqKjDpHw9g22nhRZioUn7XkbftEyOwwxUa3Ef4dZfugl_cnGVzKDCe0zF84GaYa9mQ5LQ",
    imageAlt:
      "A sleek black ceramic pour-over coffee dripper on a light concrete counter, minimal setup, harsh single light source creating strong shadows, utilitarian aesthetic.",
    shopeeUrl: "https://shopee.co.id/Ceramic-Pour-Over-Set",
    categoryId: "cat-rumah-tangga",
    isFeatured: false,
  },
  {
    name: "Matte Desk Lamp",
    price: 185000,
    discountPct: null,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAAzdq0HaQddV2sMt99cN5LPMJQQVzIQyIeAiAxlaXPQOS7sYHfB4BHnW6fF6B8PpALgNOiJ0jJST6CCJmSTcSOeV0zbZ-2RUJlB_8_eGZXHNMALIZ5R3DulROjw118abJ7vlxI8Kd0sEpar_Bz8Un81MBL7raapoRSp1Ci_-4KdxnetsuvpoDQxhgCXRruv6C6J25P0_4d3baFjpiu7BEfaA54VyNXEzE-ozQnLogreFOgPNWVHcsJddPrUxT-flsVfqtsBmmYiB8",
    imageAlt:
      "A simple modern desk lamp with a matte white finish on a dark textured desk, moody lighting, minimalist industrial design.",
    shopeeUrl: "https://shopee.co.id/Matte-Desk-Lamp",
    categoryId: "cat-elektronik",
    isFeatured: false,
  },
  {
    name: "TWS Earbuds Pro",
    price: 420000,
    discountPct: null,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDUoqySXp4jZjwnSd9fbzKHzl94GG3WCM_gtLGYO5gqQvUC5ENBoq3B1GmtAPGVjez3Gvs191w4JJBSmtyKhk1OoYyq5_B5J9wq8LSQIKWtm015jDHflPCfULBuNUD6GSMbak3KzHFWSNYbB4veJCPoClQIfN4C8DbWMHsjlgL0IYaPpMNK4bfmlqpoB7HzoJgfHI1wKEObHjmlW1DMAlppBZWhLY1WIF2duPAeJb7uy8ZxOOXQCd4isFlNIulDVJ_ftEifP5GvBAY",
    imageAlt:
      "A pair of minimalist true wireless earbuds in a matte black charging case resting on a clean white surface, high contrast, top down view.",
    shopeeUrl: "https://shopee.co.id/TWS-Earbuds-Pro",
    categoryId: "cat-elektronik",
    isFeatured: false,
  },
  {
    name: "Hydrating Serum",
    price: 150000,
    discountPct: null,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCK3xXHXp9qbdnt19OxCTE_HZod8PPRHMkApYVhXJ44us3A_ZemJmEZJIvDsAkBrJRGAA8xnGzjPLCm0ue4rtWDj1K1DDfxVGOlyETAWLy0AnwvjW3zwp4eb_w_VsKhIC01XrdGPjxWf02lrH506OmDuGVWtljZUm8vI-6m4HOXjcOePS2COkW9yzHiNAWT-xVFNS-iqqP2UvHhxe-K39tZEHoBb2z7Ed1Hn1_nvzAfvqtFMxR8wzYSaxYZiD8p9L7NnDgXL3KRFEY",
    imageAlt:
      "A minimalist skincare bottle with clean typography label, standing on a brushed steel tray, bright clinical lighting, modern aesthetic.",
    shopeeUrl: "https://shopee.co.id/Hydrating-Serum",
    categoryId: "cat-kecantikan",
    isFeatured: false,
  },
  {
    name: "Canvas Heavy Tote",
    price: 95000,
    discountPct: null,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBWiKx9VUNzsyqpO6JFTsh4rUfw66E0RpWlD2OxEdiPD96UOZW71Wt_qjDFGX1Ma0h6aY2Ly7UsP3tov0Qjra1re3r3MNlQP6y-mcxCFc9or1E9evwe7iNSR6jnRKCOOCNdILi0hOZ85Hbs0utfJJk4w0ShEvLqDzt4b90GH-wbiCa74dTh_6MlK_IK0wdv1Y-O5vodXd4yyhhdzchrqkLyDe9gUYkDOCP6EdXCcLllGI6p3mnelDP-o8GQ48gkAJJfidoOczxhpIo",
    imageAlt:
      "A structured minimalist canvas tote bag hanging on a simple metal hook against a concrete wall, neutral tones, utilitarian fashion.",
    shopeeUrl: "https://shopee.co.id/Canvas-Heavy-Tote",
    categoryId: "cat-fashion",
    isFeatured: false,
  },
]

async function main() {
  console.log("Seeding categories...")
  for (const cat of categories) {
    await prisma.category.upsert({
      where: { id: cat.id },
      update: { name: cat.name, slug: cat.slug },
      create: { id: cat.id, name: cat.name, slug: cat.slug },
    })
  }

  console.log("Seeding products...")
  for (const product of products) {
    await prisma.product.upsert({
      where: { id: product.name.toLowerCase().replace(/\s+/g, "-") },
      update: { ...product },
      create: {
        id: product.name.toLowerCase().replace(/\s+/g, "-"),
        ...product,
      },
    })
  }

  console.log("Seed complete!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
